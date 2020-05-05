import {toMarkdown} from "../to-markdown";

export function toBold(node: HTMLBodyElement): string {
    let markdown  = '';
    if (node.hasChildNodes()) {
        markdown += '**';
        let children = node.childNodes;
        for (let i = 0; i < children.length; ++i) {
            markdown += toMarkdown(children[i]);
        }
        markdown += '**';
    }
    return markdown;
}
