import {toMarkdown} from "../to-markdown";

export function blockquote(node: HTMLBodyElement): string {
    var markdown = '';
    if (node.hasChildNodes()) {
        let children = node.childNodes;
        for (let i = 0; i < children.length; ++i) {
            const innerTxt = toMarkdown(children[i]);
            if (innerTxt === '') {
                continue;
            }
            markdown += innerTxt;
        }
    }
    // cleanup
    markdown = markdown.trim();
    markdown = '> ' + markdown.split('\n').join('\n> ');
    return markdown;
}
