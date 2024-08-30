import {
	isAlbum,
	isPlaylist,
	type CardType,
} from "@/features/media-library/types"

export enum CardVariantsEnum {
	playlist = "playlist",
	artist = "artist",
	album = "album",
}

export type TCardVariantsEnum = keyof typeof CardVariantsEnum

export function getTextByType(card: CardType) {
	const { type } = card
	if (type === CardVariantsEnum.artist) {
		return `Исполнитель `
	}
	if (type === CardVariantsEnum.album && isAlbum(card)) {
		return `Альбом • ${card.artists}`
	}
	if (type === CardVariantsEnum.playlist && isPlaylist(card)) {
		return `Плейлист • ${card.owner}`
	}
}
