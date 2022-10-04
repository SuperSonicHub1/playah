# https://docs.python.org/3/library/concurrent.futures.html

import asyncio
from functools import lru_cache
from pathlib import Path
from anyio import to_thread
from HashableDict.HashableDict import HashDict
from yt_dlp import YoutubeDL

with open(Path(__file__).parent / 'banned-extractors.txt') as f:
	banned_extractors = f.read().splitlines()

class BannedExtractorError(Exception):
	extractor: str

	def __init__(self, extractor):
		super().__init__(f'Banned extractor: {extractor}')
		self.extractor = extractor

def extract_info_sync(url: str, ytdlp_params: dict = {}):
	needed_params = dict(
		quiet=True,
		# Freeer formats will play better with the browser
		prefer_free_formats=True,
		# Don't go down a rabbit hole
		extract_flat='in_playlist',
		lazy_playlist=True,
		dump_single_json=True,
		# We prefer video and audio bundled together
		# Otherwise, we'll just use manifests
		format='best / bestaudio',
		extractor_args=dict(youtube=dict(skip=[])),
		writesubtitles=True,
		# Something's better than nothing
		writeautomaticsub=True,
		# Prioritize the browser
		subtitlesformat='vtt/best',
	)
	with YoutubeDL({**ytdlp_params, **needed_params}) as ydl:
		info = ydl.extract_info(url, download=False)
		if isinstance(info, dict):
			if info['extractor'] in banned_extractors:
				raise BannedExtractorError(info['extractor'])
			return HashDict(info)
		else:
			return info

async def extract_info(url: str, ytdlp_params: dict = {}):
	return await to_thread.run_sync(extract_info_sync, url, ytdlp_params)

if __name__ == '__main__':
	async def main():
		print(
			await asyncio.gather(
				extract_info('https://www.youtube.com/watch?v=z28BWf3P7Bo'),
				extract_info('https://www.youtube.com/watch?v=Q7a-yvQQ_PU'),
			)
		)

	asyncio.run(main())
