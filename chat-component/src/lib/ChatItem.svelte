<svelte:options tag={null} />

<script lang="ts">
	import type { ChatItemType } from "./types.js"
	export let data: ChatItemType
</script>

<article>
	{ data.message }
</article>
