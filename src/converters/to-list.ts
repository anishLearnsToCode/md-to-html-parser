import {toOutDent} from "./to-out-dent";
import {toGitHubCodeBlock} from "./to-github-code-block";
import {toTextBlock} from "./to-text-block";
import {hashHtmlBlock} from "../service/hash-html-block";
import {toParagraph} from "./to-paragraph";

export function toList(text: string): string{

    /**
     * Process the contents of a single ordered or unordered list, splitting it
     * into individual list items.
     */
    const processListItems = (listStr: string, trimTrailing): string => {

        // trim trailing blank lines:
        listStr = listStr.replace(/\n{2,}$/, '\n');

        listStr += '¨0';

        let rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm;
        let isParagraphed = (/\n[ \t]*\n(?!¨0)/.test(listStr));

        listStr = listStr.replace(rgx, (wholeMatch, m1, m2, m3, m4, taskbtn, checked) => {
            checked = (checked && checked.trim() !== '');

            let item = toOutDent(m4);
            let bulletStyle = '';

            // Support for github tasklists
            if (taskbtn) {
                bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
                item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
                    let otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                    if (checked) {
                        otp += ' checked';
                    }
                    otp += '>';
                    return otp;
                });
            }

            item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, wm2 => '¨A' + wm2);

            // SPECIAL CASE: an heading followed by a paragraph of text that is not separated by a double newline
            // or/nor indented. ex:
            //
            // - # foo
            // bar is great
            //
            // While this does now follow the spec per se, not allowing for this might cause confusion since
            // header blocks don't need double newlines after
            if (/^#+.+\n.+/.test(item)) {
                item = item.replace(/^(#+.+)$/m, '$1\n');
            }

            // m1 - Leading line or
            // Has a double return (multi paragraph)
            if (m1 || (item.search(/\n{2,}/) > -1)) {
                item = toGitHubCodeBlock(item);
                item = toTextBlock(item);
            } else {

                // Recursion for sub-lists:
                item = toList(item);
                item = item.replace(/\n$/, ''); // chomp(item)
                item = hashHtmlBlock(item);

                // Collapse double linebreaks
                item = item.replace(/\n\n+/g, '\n\n');

                if (isParagraphed) {
                    item = toParagraph(item);
                } else {
                    item = toTextBlock(item);
                }
            }

            // now we need to remove the marker (¨A)
            item = item.replace('¨A', '');
            // we can finally wrap the line in list item tags
            item =  '<li' + bulletStyle + '>' + item + '</li>\n';

            return item;
        });

        // strip sentinel
        listStr = listStr.replace(/¨0/g, '');

        if (trimTrailing) {
            listStr = listStr.replace(/\s+$/, '');
        }

        return listStr;
    };

    function styleStartNumber (list, listType) {
        // check if ol and starts by a number different than 1
        if (listType === 'ol') {
            const res = list.match(/^ *(\d+)\./);
            if (res && res[1] !== '1') {
                return ' start="' + res[1] + '"';
            }
        }
        return '';
    }

    /**
     * Check and parse consecutive lists
     */
    function parseConsecutiveLists (list: string, listType: string, trimTrailing: boolean): string {
        // check if we caught 2 or more consecutive lists by mistake
        // we use the counterRgx, meaning if listType is UL we look for OL and vice versa
        let olRgx = /^ ?\d+\.[ \t]/gm;
        let ulRgx = /^ ?[*+-][ \t]/gm;
        let counterRxg = (listType === 'ul') ? olRgx : ulRgx;
        let result = '';

        if (list.search(counterRxg) === -1) {
            const style = styleStartNumber(list, listType);
            result = '\n\n<' + listType + style + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
        } else (function parseCL(txt) {
            const pos = txt.search(counterRxg);
            const style = styleStartNumber(list, listType);
            if (pos !== -1) {
                result += '\n\n<' + listType + style + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n';

                // invert counterType and listType
                listType = (listType === 'ul') ? 'ol' : 'ul';
                counterRxg = (listType === 'ul') ? olRgx : ulRgx;

                //recurse
                parseCL(txt.slice(pos));
            } else {
                result += '\n\n<' + listType + style + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
            }
        })(list);

        return result;
    }

    // Start of list parsing
    const childListRegex = /^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
    const mainListRegex = /(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;

    text += '¨0';

    // strip sentinel
    text = text.replace(/¨0/, '');
    return text;
}
