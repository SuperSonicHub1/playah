<script lang="ts">
	import VirtualList from 'svelte-virtual-list-ce'
	import ChatItem from "./ChatItem.svelte"
	import type { ChatItemType } from "./types.js"

	export let url: string | URL
	export let server_url: string | URL = new URL(
		'./chat/live',
		new URL('/', window.location.toString())
	)
	
	const our_server_url = new URL(server_url)
	our_server_url.searchParams.set('url', url.toString())
	our_server_url.protocol = 'ws:'
	
	let items: ChatItemType[] = []
	
	const ws = new WebSocket(our_server_url)
	ws.addEventListener('message', e => {
		items = [...items, JSON.parse(e.data)]
	}) 
</script>

<div>
	<VirtualList items={items} let:item>
		<ChatItem data={item} />
	</VirtualList>
</div>
