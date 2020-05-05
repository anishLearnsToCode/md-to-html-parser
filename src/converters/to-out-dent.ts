export function toOutDent(text: string): string{
    text = text.replace(/^(\t|[ ]{1,4})/gm, '¨0');
    text = text.replace(/¨0/g, '');
    return text;
}
