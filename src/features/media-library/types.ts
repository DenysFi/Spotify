import type { TCardVariantsEnum } from "@/utils/get-text-by-type"

export type BaseEtity = {
	id: string
	title: string
	img: string
	type: TCardVariantsEnum
}

export type Album = BaseEtity & {
	artists: string[]
}

export type Playlist = BaseEtity & {
	owner: string
}

export type Artist = BaseEtity

export type CardType = Artist | Playlist | Album

export type AlbumArtist = {
	name: string
}
export type PlaylistOwner = {
	display_name: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAlbum = (album: any): album is Album =>
	typeof album === "object" &&
	album !== null &&
	Object.prototype.hasOwnProperty.call(album, "artists")

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPlaylist = (playlist: any): playlist is Playlist =>
	typeof playlist === "object" &&
	playlist !== null &&
	Object.prototype.hasOwnProperty.call(playlist, "owner") &&
	playlist.owner !== null
