import {toOutDent} from "./to-out-dent";
import {encodeCode} from "../service/encode-code";
import {removeTab} from "./remove-tab";
import {toHashBlock} from "./to-hash-block";

export function toCodeBlock(text: string): string {
    // sentinel workarounds for lack of \A and \Z, safari\khtml bug
    text += '¨0';

    const pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
    text = text.replace(pattern, function (wholeMatch, m1, m2) {
        let codeBlock = m1;
        let nextChar = m2;
        let end = '\n';

        codeBlock = toOutDent(codeBlock);
        codeBlock = encodeCode(codeBlock);
        codeBlock = removeTab(codeBlock);
        codeBlock = codeBlock.replace(/^\n+/g, ''); // trim leading newlines
        codeBlock = codeBlock.replace(/\n+$/g, ''); // trim trailing newlines

        codeBlock = '<pre><code>' + codeBlock + end + '</code></pre>';

        return toHashBlock(codeBlock) + nextChar;
    });

    // strip sentinel
    text = text.replace(/¨0/, '');

    return text;
}
