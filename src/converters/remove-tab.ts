export function removeTab(text: string): string {
    // expand first n-1 tabs
    text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width

    // replace the nth with two sentinels
    text = text.replace(/\t/g, '¨A¨B');

    // use the sentinel to anchor our regex so it doesn't explode
    text = text.replace(/¨B(.+?)¨A/g, function (wholeMatch, m1) {
        let leadingText = m1;
        let numSpaces = 4 - leadingText.length % 4;  // g_tab_width

        // there *must* be a better way to do this:
        for (let i = 0; i < numSpaces; i++) {
            leadingText += ' ';
        }

        return leadingText;
    });

    // clean up sentinels
    text = text.replace(/¨A/g, '    ');  // g_tab_width
    text = text.replace(/¨B/g, '');

    return text;
}
