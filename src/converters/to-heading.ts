import {toTextBlock} from "./to-text-block";
import {toHashBlock} from "./to-hash-block";

export function toHeading(text: string): string {
    const headerLevelStart = 1;
    const setextRegexH1 = /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm;
    const setextRegexH2 = /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm;

    text = text.replace(setextRegexH1, (wholeMatch, m1) => {

        const spanGamut = toTextBlock(m1);
        const hID = '';
        const hLevel = headerLevelStart;
        const hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
        return toHashBlock(hashBlock);
    });

    text = text.replace(setextRegexH2, (matchFound, m1) => {
        const spanGamut = toTextBlock(m1);
        const hID = '';
        const hLevel = headerLevelStart + 1;
        const hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
        return toHashBlock(hashBlock);
    });

    // atx-style headers:
    //  # Header 1
    //  ## Header 2
    //  ## Header 2 with closing hashes ##
    //  ...
    //  ###### Header 6
    //
    const atxStyle = /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm;

    text = text.replace(atxStyle, (wholeMatch, m1, m2) => {
        const span = toTextBlock(m2);
        const hID = '';
        const hLevel = headerLevelStart - 1 + m1.length;
        const header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';

        return toHashBlock(header);
    });

    return text;
}
