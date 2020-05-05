export function hashHtmlBlock(text: string): string {
    text = text.replace(/(^\n+|\n+$)/g, '');
    return text;
}
