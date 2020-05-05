import {toHashBlock} from "./to-hash-block";

export function toHorizontalRule(text: string): string {
    const key = toHashBlock('<hr />');
    text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
    text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
    text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
    
    return text;
}
