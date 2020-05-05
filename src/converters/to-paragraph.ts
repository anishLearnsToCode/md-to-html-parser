import {toTextBlock} from "./to-text-block";
import {encodeCode} from "../service/encode-code";

export function toParagraph(text: string): string {
    let i;
// Strip leading and trailing lines:
    text = text.replace(/^\n+/g, '');
    text = text.replace(/\n+$/g, '');

    let graft = text.split(/\n{2,}/g);
    let graftOut = [];
    let end = graft.length; // Wrap <p> tags

    for (i = 0; i < end; i++) {
        let str = graft[i];
        // if this is an HTML marker, copy it
        if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
            graftOut.push(str);

            // test for presence of characters to prevent empty lines being parsed
            // as paragraphs (resulting in undesired extra empty paragraphs)
        } else if (str.search(/\S/) >= 0) {
            str = toTextBlock(str);
            str = str.replace(/^([ \t]*)/g, '<p>');
            str += '</p>';
            graftOut.push(str);
        }
    }

    /** Un-hash HTML blocks */
    end = graftOut.length;
    for (i = 0; i < end; i++) {
        let blockText = '';
        let graftOutElement = graftOut[i];
        let flag = false;

        // if this is a marker for an html block...
        // use RegExp.test instead of string.search because of QML bug
        while (/¨([KG])(\d+)\1/.test(graftOutElement)) {
            const delimiter = RegExp.$1;
            const num = RegExp.$2;

            if (delimiter === 'K') {
                blockText = globals.gHtmlBlocks[num];
            } else {
                // we need to check if ghBlock is a false positive
                if (flag) {
                    // use encoded version of all text
                    blockText = encodeCode(globals.ghCodeBlocks[num].text);
                } else {
                    blockText = globals.ghCodeBlocks[num].codeblock;
                }
            }
            blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

            graftOutElement = graftOutElement.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
            // Check if graftOutElement is a pre->code
            if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(graftOutElement)) {
                flag = true;
            }
        }
        graftOut[i] = graftOutElement;
    }
    text = graftOut.join('\n');
    // Strip leading and trailing lines:
    text = text.replace(/^\n+/g, '');
    text = text.replace(/\n+$/g, '');

    return text;
}
