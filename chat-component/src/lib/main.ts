import component from "svelte-tag"
import LiveChat from './LiveChat.svelte'
new component({
	component: LiveChat,
	tagname: "live-chat",
	attributes:["url", 'server_url']
})
export default LiveChat;
