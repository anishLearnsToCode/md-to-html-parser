import {toHorizontalRule} from "./to-horizontal-rule";
import {toBlockQuotes} from "./to-block-quotes";
import {toHeading} from "./to-heading";
import {toList} from "./to-list";
import {toCodeBlock} from "./to-code-block";
import {toTable} from "./to-table";
import {hashHtmlBlock} from "../service/hash-html-block";
import {toParagrapgh} from "./to-paragrapgh";

export function toTextBlock(text: string) {

    // Parsing blockquotes first so that we can have headings and h-rules
    text = toBlockQuotes(text);
    text = toHeading(text);

    // Add Horizontal Lines:
    text = toHorizontalRule(text);

    text = toList(text);
    text = toCodeBlock(text);
    text = toTable(text);

    // We already ran _HashHTMLBlocks() before, in Markdown(), but that
    // was to escape raw HTML in the original Markdown source. This time,
    // we're escaping the markup we've just created, so that we don't wrap
    // <p> tags around block-level tags.
    text = hashHtmlBlock(text);
    text = toParagrapgh(text);

    return text;
}
