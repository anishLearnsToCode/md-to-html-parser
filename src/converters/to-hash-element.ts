import {getHtmlBlock} from "../service/get-html-block";

export function toHashElement(text: string): string {
    // @ts-ignore
    let blockText = m1;

    // Undo double lines
    blockText = blockText.replace(/\n\n/g, '\n');
    blockText = blockText.replace(/^\n/, '');

    // strip trailing blank lines
    blockText = blockText.replace(/\n+$/g, '');

    // Replace the element text with a marker ("¨KxK" where x is its key)
    // @ts-ignore
    blockText = '\n\n¨K' + (getHtmlBlock().push(blockText) - 1) + 'K\n\n';

    return blockText;
}
