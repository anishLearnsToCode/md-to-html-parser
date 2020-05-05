import {emojis} from "./emojis";

export function toEmoji(text: string): string {
    const emojiRgx = /:([\S]+?):/g;

    text = text.replace(emojiRgx, (wm, emojiCode) => {
        if (emojis.hasOwnProperty(emojiCode)) {
            return emojis[emojiCode];
        }
        return wm;
    });

    return text;
}
