export enum CardVariantsEnum {
	playlist = "playlist",
	author = "author",
	album = "album",
}

export type TCardVariantsEnum = keyof typeof CardVariantsEnum

export function getTextByType(type: TCardVariantsEnum) {
	if (type === CardVariantsEnum.author) {
		return "Исполнитель "
	}
	if (type === CardVariantsEnum.album) {
		return "Альбом • Максимально длинный автор"
	}
	if (type === CardVariantsEnum.playlist) {
		return "Плейлист • Максимально длинный автор"
	}
}
