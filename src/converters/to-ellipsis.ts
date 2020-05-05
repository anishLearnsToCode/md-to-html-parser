// converts ellipsis in markdown to ellipsis in HTML
export function toEllipsis(text: string): string {
    text = text.replace(/\.\.\./g, '…');
    return text;
}
