import {HtmlAttributes} from "../html-attributes";

export function codeBlock(node: HTMLBodyElement): string {
    const lang = node.getAttribute(HtmlAttributes.LANGUAGE);
    const num  = node.getAttribute(HtmlAttributes.PRECODENUM);
    return '```' + lang + '\n' + globals.preList[num] + '\n```';
}
