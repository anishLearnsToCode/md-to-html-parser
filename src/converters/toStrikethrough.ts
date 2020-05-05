export function toStrikethrough(text: string): string {
    text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, (wm, txt) => '<del>' + txt + '</del>');
    return text;
}
