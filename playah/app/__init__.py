from datetime import datetime, timedelta
from html import unescape
from mimetypes import guess_type, add_type
import re
from typing import Optional

from ansi2html import Ansi2HTMLConverter
from markupsafe import Markup, escape
from quart import (
	Quart,
	render_template,
	abort,
	redirect,
	url_for,
	request,
	make_response,
)
from yt_dlp import version
from yt_dlp.extractor import list_extractors
from yt_dlp.extractor.common import SearchInfoExtractor
from yt_dlp.utils import YoutubeDLError

from .chat import chat_blueprint
from .proxy import proxy_blueprint
from ..async_yt_dlp import extract_info, BannedExtractorError

# Add additional extensions to the mimetype database
# Because SubStation Alpha doesn't have an official mimetype,
# we're going to make one up
# https://en.wikipedia.org/wiki/SubStation_Alpha
add_type('text/substation', '.ssa')
add_type('text/substation', '.ass')

search_extractors = dict(
	(ie.SEARCH_KEY, ie.__class__.__name__[:-2])
	for ie in list_extractors()
	if isinstance(ie, SearchInfoExtractor)
)

app = Quart(__name__)
app.register_blueprint(chat_blueprint)
app.register_blueprint(proxy_blueprint)

@app.context_processor
def inject_search_extractors():
	return dict(search_extractors=search_extractors)

@app.context_processor
def inject_library_versions():
	import pkg_resources

	return dict(
		yt_dlp_version=version.__version__,
		yt_dlp_release_git_head=version.RELEASE_GIT_HEAD,
		chat_downloader_version=pkg_resources.get_distribution('chat-downloader').version
	)

@app.context_processor
def is_dev():
	return dict(is_dev=app.config['ENV'] == 'development')

@app.context_processor
def inject_datetime():
	return dict(datetime=datetime)

app.add_template_filter(repr)
app.add_template_filter(unescape)

@app.template_filter('guess_type')
def guess(type: str, url: bool = False):
	if not url:
		type = f'https://kawc.co/hello.{type}'
	if url:
		try:
			type = type[:type.index('?')]
		except ValueError:
			pass
	return guess_type(type)[0]

@app.template_filter('get_title')
def get_title(info: dict) -> str:
	# Bandcamp uses 'track' for the song name.
	# If we use 'title,' we get f'{artist} - {track}',
	# which is a bit repetitive
	if info['extractor'] == 'Bandcamp':
		return info['track']
	
	if info['extractor'] == 'Crunchyroll':
		return info['episode']
	
	return info['title']

@app.template_filter('get_uploader')
def get_uploader(info: dict) -> Optional[str]:
	return info.get('artist') or info.get('uploader') or info.get('uploader_id')

@app.template_filter('has_chat')
async def has_chat(info: dict) -> bool:
	extractor = info['extractor']
	subtitles = info.get('subtitles', {})
	return (
		extractor == 'twitch:stream'
		or (extractor == 'twitch:vod' and 'rechat' in subtitles)
		or (extractor == 'youtube' and 'live_chat' in subtitles)
	)

# TODO: A bit awkward ATM
# @app.template_filter('nl2br')
# def nl2br(value: str):
# 	"""
# 	https://jinja.palletsprojects.com/en/3.0.x/api/#custom-filters
# 	"""
# 	br = "<br>\n"

# 	value = escape(value)
# 	br = Markup(br)

# 	result = "\n\n".join(
# 		f"<p>{br.join(p.splitlines())}<\p>"
# 		for p in re.split(r"(?:\r\n|\r(?!\n)|\n){2,}", value)
# 	)
# 	return Markup(result)

def try_or(func, backup = None) -> str:
	try:
		return func()
	except:
		return backup

ansiconv = Ansi2HTMLConverter(dark_bg=False, linkify=True)
@app.errorhandler(YoutubeDLError)
async def handle_yt_dlp_error(error: YoutubeDLError):
	print(error)
	error_text = Markup(ansiconv.convert(error.args[0], full=False))
	return await render_template('error.html', error=error, error_text=error_text), 500

@app.errorhandler(BannedExtractorError)
async def handle_banned_extractor(error: BannedExtractorError):
	return await render_template('banned-extractor.html', error=error), 400

@app.route('/')
async def index():
	return await render_template('index.html')

@app.route('/resolve')
async def resolve():
	url = request.args.get('url')
	if not url:
		abort(400)
	
	info = await extract_info(url)
	
	if '_type' not in info:
		return redirect(url_for('watch', v=url, list=request.args.get('list'), index=request.args.get('index')))

	_type = info['_type']
	if _type == 'playlist':
		# TODO: Implement playlist route
		return redirect(url_for('playlist', list=url))
	else:
		return f'Unsupported video type: {_type}', 500

@app.route('/watch')
async def watch():
	url = request.args.get('v')
	if not url:
		abort(400)

	playlist_info = None
	index = None

	playlist = request.args.get('list')
	if playlist:
		playlist_info = await extract_info(playlist)
		index_arg: str = request.args.get('index')
		if index_arg and index_arg.isnumeric():
			index = int(index_arg)

	subtitle_langs = list(request.accept_languages.values())
	for lang in subtitle_langs:
		# HACK: Crunchyroll formats its subtitle languages
		# like 'enUS' instead of 'en-US' as per the
		# IETF BCP 47 language tag standard:
		# https://en.wikipedia.org/wiki/IETF_language_tag
		if len(lang) == 5 and lang[2] == '-':
			subtitle_langs.append(lang[:2] + lang[3:])

	info = await extract_info(
		url,
		# Always prefer a video
		dict(
			noplaylist=True,
			subtitleslangs=subtitle_langs,
		)
	)

	return await render_template(
		'watch.html',
		info=info,
		playlist_info=playlist_info,
		index=index,
		current_time=try_or(lambda: float(request.args.get('t'))),
	)

@app.route('/playlist')
async def playlist():
	url = request.args.get('list')
	if not url:
		abort(400)

	info = await extract_info(url)

	return await render_template('playlist.html', info=info)

@app.route('/results')
async def results():
	query = request.args.get('search_query')
	if not query:
		abort(400)

	extractor_search_key = request.args.get('extractor', 'ytsearch')

	results = await extract_info(f"{extractor_search_key}50:{query}")

	return await render_template(
		'search.html',
		results=results,
		query=query,
		extractor=search_extractors[extractor_search_key],
		extractor_search_key=extractor_search_key
	)	

def timedelta_to_webvtt(td: timedelta) -> str:
	milliseconds = str(int(td.seconds * 1000 % 1000))
	seconds = str(int(td.seconds % 60))
	minutes = str(int(td.seconds / 60 % 60))
	hours = str(int(td.seconds / (60 * 60) % 60))

	return f'{hours.zfill(2)}:{minutes.zfill(2)}:{seconds.zfill(2)}.{milliseconds.zfill(3)}'

@app.route('/chapters')
async def chapters():
	url = request.args.get('v')
	if not url:
		abort(400)
	
	info = await extract_info(
		url,
		# Always prefer a video
		dict(noplaylist=True,)
	)

	chapters = info.get('chapters')
	if not chapters:
		abort(404)

	webvtt = """WEBVTT
Kind: chapters

"""
	cues = '\n\n'.join([
		f"""{cue_id}
{timedelta_to_webvtt(timedelta(seconds=chapter['start_time']))} --> {timedelta_to_webvtt(timedelta(seconds=chapter['end_time']))}
{chapter['title']}"""
		for cue_id, chapter in enumerate(chapters)
	])

	response = await make_response(''.join((webvtt, cues, '\n')))
	response.headers['content-type'] = 'text/vtt'
	return response
