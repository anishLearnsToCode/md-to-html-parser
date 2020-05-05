export function toHtml(markdown: string): string {
    
    const doctypeParsed = '<!DOCTYPE HTML>\n';
    const title = '';
    const charset = '<meta charset="utf-8">\n';
    const lang = '';
    const metadata = '';

    markdown = doctypeParsed + '<html' + lang + '>\n<head>\n' + title + charset + metadata + '</head>\n<body>\n' + text.trim() + '\n</body>\n</html>';
    
    return markdown;
}
