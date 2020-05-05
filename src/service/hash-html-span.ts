export function hashHtmlSpan(text: string): string {
    // Hash Self Closing tags
    text = text.replace(/<[^>]+?\/>/gi, function (wm) {
        return hashHtmlSpan(wm);
    });

    // Hash tags without properties
    text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (wm) {
        return hashHtmlSpan(wm);
    });

    // Hash tags with properties
    text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (wm) {
        return hashHtmlSpan(wm);
    });

    // Hash self closing tags without />
    text = text.replace(/<[^>]+?>/gi, function (wm) {
        return hashHtmlSpan(wm);
    });

    return text;
}
