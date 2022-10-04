from httpx import AsyncClient
from httpx import Response as HttpxResponse
import m3u8
from quart import (
	Blueprint,
	request,
	abort,
	jsonify,
	make_response,
	request,
	url_for,
)
from ..async_yt_dlp import extract_info

client = AsyncClient()
proxy_blueprint = Blueprint('proxy', __name__, url_prefix='/proxy')

def build_request(url: str, info: dict):
	headers = dict(request.headers)
	# Don't want these!
	headers.pop('Host')
	headers.pop('Remote-Addr')

	req = client.build_request(
		'GET',
		url,
		headers={**headers, **{'x-forwarded-ip': request.remote_addr}, **info.get('http_headers', {})},
	)

	return req

async def httpx_to_quart(content, res: HttpxResponse):
	server_res = await make_response(content)

	server_res_headers = {**server_res.headers}
	res_headers = res.headers
	if isinstance(content, str):
		if 'content-type' in res_headers:
			server_res_headers['content-type'] = res_headers['content-type']
	else:
		server_res_headers.update(res.headers)

	server_res.headers = server_res_headers
	server_res.headers['x-url'] = str(res.url)
	server_res.status_code = res.status_code
	return server_res

async def straight_get(
	url: str,
	info: dict,
):
	req = build_request(url, info)
	res = await client.send(req, stream=True)

	async def async_generator():
		async for chunk in res.aiter_raw():
			yield chunk
		await res.aclose()

	return await(httpx_to_quart(async_generator(), res))

async def proxy_hls(url: str):
	req = build_request(url, {})
	res = await client.send(req)
	text = res.text

	playlist = m3u8.loads(res.text, str(res.url))

	if playlist.is_variant:
		for inner_playlist in playlist.playlists:
			inner_playlist.uri = url_for('proxy.manifest_hls', url=inner_playlist.absolute_uri)
	else:
		for segment in playlist.segments:
			segment.uri = url_for('proxy.manifest_fragment', url=segment.absolute_uri)

	transformed = playlist.dumps()

	return await httpx_to_quart(transformed, res)

@proxy_blueprint.route('/media')
async def media():
	video_url = request.args.get('v')
	if not video_url:
		abort(400)

	info = await extract_info(video_url)
	format_id = request.args.get('format_id', info['format_id'])
	try:
		format = [format for format in info['formats'] if format['format_id'] == format_id][0] 
	except IndexError:
		# The format isn't here!
		abort(404)

	return await straight_get(format['url'], info)

@proxy_blueprint.route('/thumbnail')
async def thumbnail():
	video_url = request.args.get('v')
	if not video_url:
		abort(400)

	info = await extract_info(video_url)
	thumbnail_url = info.get('thumbnail')
	if not thumbnail_url:
		abort(404)
	
	return await straight_get(thumbnail_url, info)

@proxy_blueprint.route('/requested-subtitles')
async def requested_subtitles():
	video_url = request.args.get('v')
	if not video_url:
		abort(400)
	
	language = request.args.get('language')
	if not language:
		abort(400)

	info = await extract_info(video_url)
	subtitles_url = info.get('requested_subtitles', {}).get(language, {}).get('url')
	if not subtitles_url:
		abort(404)
	
	return await straight_get(subtitles_url, info)

@proxy_blueprint.route('/manifest-fragment')
async def manifest_fragment():
	url = request.args.get('url')
	if not url:
		abort(400)

	return await straight_get(url, {})

@proxy_blueprint.route('/manifest-hls')
async def manifest_hls():
	manifest_url = None

	video_url = request.args.get('v')
	if video_url:
		info = await extract_info(video_url)
		manifest_url = info.get('manifest_url')
		if not manifest_url:
			abort(404)
	
	manifest_url = request.args.get('url', manifest_url)

	if manifest_url:
		return await proxy_hls(manifest_url)

	abort(400)

@proxy_blueprint.route('/manifest-dash')
async def manifest_dash():
	video_url = request.args.get('v')
	if not video_url:
		abort(400)

	info = await extract_info(video_url)
	manifest_url = info.get('manifest_url')
	if not manifest_url:
		abort(404)

	return await proxy_dash(manifest_url)
