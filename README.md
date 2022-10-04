# Playah

a yt-dlp media player in your browser

> a yt-dlp client for the masses

## Features
* video, playlist, and search URL structure generally compatible with YouTube
	* `watch?v=&list=&index=&t=`
	* `playlist?list=`
	* `search?search_query=` (`extractor` arg defaults to YouTube search)
* play video and audio
* playlist controls
* automatically play next item in playlist
	* JS only included if there is a next video
* "original link" buttons
* URLized descriptions
* thumbnail acts as poster
* recursive playlists
* error handling
* ability to ban extractors
* search
* proxy videos and images
* proxy HLS content
	* JS only included if video is HLS
	* HLS.js only loaded if browser lacks native HLS support
* chapters (backed by WebVTT and `track[kind=chapters]` with simple JS frontend)
* captions
	* SSA
	* WebVTT
	* works with Accept-Language

## Stuff to Add
* populate pages with more attributes from yt-dlp
	*     view_count:     How many users have watched the video on the platform.
	*     like_count:     Number of positive ratings of the video
	*     dislike_count:  Number of negative ratings of the video
	*     repost_count:   Number of reposts of the video
	*     channel_follower_count: Number of followers of the channel.
* [get comments](https://github.com/yt-dlp/yt-dlp/blob/164b03c4864b0d44cfee5e7702f7c2317164a6cf/yt_dlp/YoutubeDL.py#L258-L259)
	* https://github.com/yt-dlp/yt-dlp/blob/master/yt_dlp/extractor/common.py#L289-L307
	* [Consider limiting number of comments](https://github.com/yt-dlp/yt-dlp#youtube)
* figure out search pagination
* loop playlists
* get chat stuff working
	* consider using https://www.npmjs.com/package/svelte-tag
	* how do I turn a sync generator into an async one?
* audio-only mode
* proxy DASH content and find a player for DASH content (Unlocks HQ YT content)
* make a video demonstrating functionality
* publish and share!
* get subtitles working
	* all languages (not just the one your browser requests)
* figure out a more "correct" cache
* SponsorBlock
* "hashtagize" descriptions and thumbnails
	* detect hashtag extractors
	* fall back on search
* support other subtitle formats
	* SRT
	* TTML
	* maybe proprietary YT ones?
* [LibreJS compatibility](https://www.gnu.org/software/librejs/free-your-javascript.html)
* use a video player with custom controls
in order to have SSA be useale while fullscreen
or figure out my CSS hack
* consider making chat-downloader sans-IO/rewriting it
to be async
* allow user to create custom playlists through storing
links in URL params
* video quality switcher
* handle presence of `s` in `/watch?t=` (https://www.youtube.com/watch?v=f4QShF42c6E&t=6015s)
