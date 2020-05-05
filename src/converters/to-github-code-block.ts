import {toHashBlock} from "./to-hash-block";
import {encodeCode} from "../service/encode-code";
import {removeTab} from "./remove-tab";

export function toGitHubCodeBlock(text: string): string {
    text += '¨0';

    text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g,
        (wholeMatch, delim, language, codeblock) => {

        // First parse the github code block
        codeblock = encodeCode(codeblock);
        codeblock = removeTab(codeblock);
        codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
        codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

        codeblock = '<pre><code'
            + (language ? ' class="' + language + ' language-' + language + '"' : '')
            + '>'
            + codeblock
            + '</code></pre>';

        codeblock = toHashBlock(codeblock);

        return codeblock;
    });

    text = text.replace(/¨0/, '');

    return text;
}
