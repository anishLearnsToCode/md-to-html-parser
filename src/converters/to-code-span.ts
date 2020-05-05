import {encodeCode} from "../service/encode-code";
import {hashHtmlSpan} from "../service/hash-html-span";

export function toCodeSpan(text: string): string {
    if (typeof(text) === 'undefined') {
        text = '';
    }
    text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
        (matchText, option1, option2, option3) => {
            let c = option3;
            c = c.replace(/^([ \t]*)/g, '');	// leading whitespace
            c = c.replace(/[ \t]*$/g, '');	// trailing whitespace
            c = encodeCode(c);
            c = option1 + '<code>' + c + '</code>';
            c = hashHtmlSpan(c);
            return c;
        }
    );

    return text;
}
