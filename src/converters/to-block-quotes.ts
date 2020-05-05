import {toGitHubCodeBlock} from "./to-github-code-block";
import {toTextBlock} from "./to-text-block";
import {toHashBlock} from "./to-hash-block";

export function toBlockQuotes(text: string): string {

    // add a couple extra lines after the text
    text = text + '\n\n';

    let regex = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;

    text = text.replace(regex, (blockQuote) => {
        blockQuote = blockQuote.replace(/^[ \t]*>[ \t]?/gm, ''); // trim one level of quoting

        blockQuote = blockQuote.replace(/¨0/g, '');

        // trim whitespace-only lines
        blockQuote = blockQuote.replace(/^[ \t]+$/gm, '');
        blockQuote = toGitHubCodeBlock(blockQuote);
        blockQuote = toTextBlock(blockQuote);

        blockQuote = blockQuote.replace(/(^|\n)/g, '$1  ');

        // These leading spaces screw with <pre> content, so we need to fix that:
        blockQuote = blockQuote.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
            let pre = m1;
            // attacklab: hack around Konqueror 3.5.4 bug:
            pre = pre.replace(/^  /mg, '¨0');
            pre = pre.replace(/¨0/g, '');
            return pre;
        });

        return toHashBlock('<blockquote>\n' + blockQuote + '\n</blockquote>');
    });

    return text;
}
