from quart import Blueprint, request, abort, jsonify, websocket

from ..async_chat_dl import get_chat, sync_gen_to_async

chat_blueprint = Blueprint('chat', __name__, url_prefix='/chat')

@chat_blueprint.route('/past')
async def past_chat():
	"""
	TODO: Very broken.
	Very long load times.
	"""
	url = request.args.get('url')
	if not url:
		abort(400)

	chat = await get_chat(url=url)
	if chat.status != 'past':
		abort(400)

	messages = []
	async for message in sync_gen_to_async(chat, 1_000_000):
		messages.append(message)

	return jsonify(messages)

@chat_blueprint.websocket('/live')
async def live_chat():
	url = websocket.args.get('url')
	if not url:
		abort(400)

	chat = await get_chat(url=url)
	if chat.status != 'live':
		abort(400)

	async for msg in sync_gen_to_async(chat):
		await websocket.send_json(msg)
