import {toHtml} from "../to-html";
import {getHtmlBlock} from "../service/get-html-block";
import {toHashElement} from "./to-hash-element";

export function toHashBlock(text: string): string {
    const blockTags = [
            'pre',
            'div',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'blockquote',
            'table',
            'dl',
            'ol',
            'ul',
            'script',
            'noscript',
            'form',
            'fieldset',
            'iframe',
            'math',
            'style',
            'section',
            'header',
            'footer',
            'nav',
            'article',
            'aside',
            'address',
            'audio',
            'canvas',
            'figure',
            'hgroup',
            'output',
            'video',
            'p'
        ],
        repFunc = (wholeMatch, match, left, right) => {
            let txt = wholeMatch;
            // check if this html element is marked as markdown
            // if so, it's contents should be parsed as markdown
            if (left.search(/\bmarkdown\b/) !== -1) {
                txt = left + toHtml(match) + right;
            }
            // @ts-ignore
            return '\n\n¨K' + (getHtmlBlock().push(txt) - 1) + 'K\n\n';
        };

    // hash HTML Blocks
    for (let i = 0; i < blockTags.length; ++i) {

        let opTagPos;
        let rgx1 = new RegExp('^ {0,3}(<' + blockTags[i] + '\\b[^>]*>)', 'im');
        let patLeft = '<' + blockTags[i] + '\\b[^>]*>';
        let patRight = '</' + blockTags[i] + '>';

        // 1. Look for the first position of the first opening HTML tag in the text
        // @ts-ignore
        while ((opTagPos = regexIndexOf(text, rgx1)) !== -1) {

            // if the HTML tag is \ escaped, we need to escape it and break


            //2. Split the text in that position
            // @ts-ignore
            const subTexts = splitAtIndex(text, opTagPos);
            // @ts-ignore
            const newSubText1 = replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, 'im');

            // prevent an infinite loop
            if (newSubText1 === subTexts[1]) {
                break;
            }
            text = subTexts[0].concat(newSubText1);
        }
    }
    // HR SPECIAL CASE
    text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
        toHashElement(text));

    // Special case for standalone HTML comments
    // @ts-ignore
    text = replaceRecursiveRegExp(text, (txt) => {
        // @ts-ignore
        return '\n\n¨K' + (getHtmlBlock().push(txt) - 1) + 'K\n\n';
    }, '^ {0,3}<!--', '-->', 'gm');

    // PHP and ASP-style processor instructions (<?...?> and <%...%>)
    text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
        toHashElement(text));

    return text;
}
