// https://chat-downloader.readthedocs.io/en/latest/items.html

/**
 * @typedef {Object} ChatItem
 * @property {number} timestamp - UNIX time (in microseconds) of when the message was sent.
 * @property {string} message - Actual content/text of the chat item.
 * @property {string} message_id - Identifier for the chat item.
 * @property {string} message_type - Message type of the item.
 * @property {Author} author - A dictionary containing information about the user who sent the message. For author fields, see here.
 * @property {number} time_in_seconds - The number of seconds after the video began, that the message was sent. This is only present for replays/vods/clips (i.e. a video which is not live).
 * @property {string} time_text - Human-readable format for time_in_seconds.
 * @property {number} amount - The amount of money that was sent with the message.
 * @property {string} sub_message - Additional text of the message.
 * @property {string} action_type - Action type of the item.
 * @property {string} tooltip - Text to be displayed when hovering over the message.
 * @property {string} icon - Icon associated with the message.
 * @property {string} target_message_id - The identifier for a message which this message references.
 * @property {string} action - The action of the message.
 * @property {boolean} viewer_is_creator - Whether the viewer is the creator or not.
 * @property {Image[]} sticker_images - A list which contains different sizes of the sticker image. See here for image fields.
 * @property {Image[]} sponsor_icons - A list which contains different sizes of the sponsor image. See here for image fields.
 * @property {Image[]} ticker_icons - A list which contains different sizes of the ticker image. See here for image fields.
 * @property {number} ticker_duration - How long the ticker message is displayed for.
 */
export type ChatItemType = {
	timestamp: number,
	message: string,
	message_id: string,
	message_type: string,
	author: Author,
	time_in_seconds: number,
	time_text: string,
	amount: number,
	sub_message: string,
	action_type: string,
	tooltip: string,
	icon: string,
	target_message_id: string,
	action: string,
	viewer_is_creator: boolean,
	sticker_images: Image[],
	sponsor_icons: Image[],
	ticker_icons: Image[],
	ticker_duration: number,
}

/**
 * @typedef {Object} Author
 * @property {string} name - The name of the author.
 * @property {string} id - Idenfifier for the author.
 * @property {string} display_name - The name of the author which is displayed to the viewer. This may be different to name.
 * @property {string} short_name - A shortened version of the author’s name.
 * @property {string} type - Type of the author.
 * @property {string} url - URL of the author’s channel/page.
 * @property {Image[]} images - A list which contains different sizes of the author’s profile picture. See here for the fields that an image may have.
 * @property {Badge[]} badges - A list of the author’s badges. See here for the fields that a badge may have.
 * @property {string} gender - Gender of the author.
 * @property {boolean} is_banned - True if the user is banned, False otherwise.
 * @property {boolean} is_bot - True if the user is a bot, False otherwise.
 * @property {boolean} is_non_coworker - True if the user is not a coworker, False otherwise.
 * @property {boolean} is_original_poster - True if the user is the original poster, False otherwise.
 * @property {boolean} is_verified - True if the user is verified, False otherwise.
 */
export type Author = {
	name: string,
	id: string,
	display_name: string,
	short_name: string,
	type: string,
	url: string,
	images: Image[],
	badges: Badge[],
	gender: string,
	is_banned: boolean,
	is_bot: boolean,
	is_non_coworker: boolean,
	is_original_poster: boolean,
	is_verified: boolean,
}

/**
 * @typedef {Object} Image
 * @property {string} url - The URL of the actual image
 * @property {number} width - The width of the image
 * @property {number} height - The height of the image
 * @property {string} image_id - A identifier for the image, usually of the form: {width}x{height}
 */
export type Image = {
	url: string,
	width: number,
	height: number,
	image_id: string,
}

/**
 * @typedef {Object} Badge
 * @property {string} title - The title of the badge.
 * @property {string} id - Identifier for the badge.
 * @property {string} name - Name of the badge.
 * @property {number} version - Version of the badge.
 * @property {string} icon_name - Name of the badge icon.
 * @property {Image[]} icons - A list of images for the badge icons.
 * @property {string} description - The description of the badge.
 * @property {string} alternative_title - Alternative title of the badge.
 * @property {string} click_action - Action to perform if the badge is clicked.
 * @property {string} click_url - URL to visit if the badge is clicked.
 */
export type Badge = {
	title: string,
	id: string,
	name: string,
	version: number,
	icon_name: string,
	icons: Image[],
	description: string,
	alternative_title: string,
	click_action: string,
	click_url: string,
}
