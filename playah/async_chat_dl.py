# https://docs.python.org/3/library/concurrent.futures.html

import asyncio
from itertools import islice
from typing import Iterable, AsyncGenerator
from anyio import to_thread
from chat_downloader import ChatDownloader

downloader = ChatDownloader()
def get_chat_sync(url: str):
	return downloader.get_chat(url)

async def get_chat(url: str):
	return await to_thread.run_sync(get_chat_sync, url)

def grab(iterable: Iterable, size: int):
	return list(islice(iterable, size))

async def sync_gen_to_async(iterable: Iterable, grab_size: int = 5) -> AsyncGenerator:
	while True:
		try:
			for element in await to_thread.run_sync(grab, iterable, grab_size):
				yield element 
		except StopIteration:
			pass

if __name__ == '__main__':
	async def main():
		chat = await get_chat('https://www.twitch.tv/lordaethelstan')
		async for message in sync_gen_to_async(chat):
			print(message)

	asyncio.run(main())
