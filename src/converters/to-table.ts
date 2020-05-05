import {toTextBlock} from "./to-text-block";
import {toCodeSpan} from "./to-code-span";
import {isUndefined} from "../helper/is-undefined";

export function toTable(text: string): string {
    const tableRegex = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm;
    const singleColumnRegex = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;

    function parseStyles (sLine) {
        if (/^:[ \t]*--*$/.test(sLine)) {
            return ' style="text-align:left;"';
        } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
            return ' style="text-align:right;"';
        } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
            return ' style="text-align:center;"';
        } else {
            return '';
        }
    }

    const parseHeaders = (header, style, options?: any) => {
        let id = '';
        header = header.trim();
        // support both tablesHeaderId and tableHeaderId due to error in documentation so we don't break backwards compatibility
        if (options.tablesHeaderId || options.tableHeaderId) {
            id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
        }
        header = toTextBlock(header);

        return '<th' + id + style + '>' + header + '</th>\n';
    };

    const parseCells = (cell, style) => {
        const subText = toTextBlock(cell);
        return '<td' + style + '>' + subText + '</td>\n';
    };

    function buildTable (headers, cells) {
        let i;
        let tb = '<table>\n<thead>\n<tr>\n',
            tblLgn = headers.length;

        for (i = 0; i < tblLgn; ++i) {
            tb += headers[i];
        }
        tb += '</tr>\n</thead>\n<tbody>\n';

        for (i = 0; i < cells.length; ++i) {
            tb += '<tr>\n';
            for (let ii = 0; ii < tblLgn; ++ii) {
                tb += cells[i][ii];
            }
            tb += '</tr>\n';
        }
        tb += '</tbody>\n</table>\n';
        return tb;
    }

    function parseTable (rawTable) {
        let i, tableLines = rawTable.split('\n');

        for (i = 0; i < tableLines.length; ++i) {
            // strip wrong first and last column if wrapped tables are used
            if (/^ {0,3}\|/.test(tableLines[i])) {
                tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, '');
            }
            if (/\|[ \t]*$/.test(tableLines[i])) {
                tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
            }
            // parse code spans first, but we only support one line code spans

            tableLines[i] = toCodeSpan(tableLines[i]);
        }

        const rawHeaders = tableLines[0].split('|').map(s => s.trim());
        const rawStyles = tableLines[1].split('|').map(s => s.trim());
        const rawCells = [];
        const headers = [];
        const styles = [];
        const cells = [];

        tableLines.shift();
        tableLines.shift();

        for (i = 0; i < tableLines.length; ++i) {
            if (tableLines[i].trim() === '') {
                continue;
            }
            rawCells.push(
                tableLines[i]
                    .split('|')
                    .map(s => s.trim())
            );
        }

        if (rawHeaders.length < rawStyles.length) {
            return rawTable;
        }

        for (i = 0; i < rawStyles.length; ++i) {
            styles.push(parseStyles(rawStyles[i]));
        }

        for (i = 0; i < rawHeaders.length; ++i) {
            if (isUndefined(styles[i])) {
                styles[i] = '';
            }
            headers.push(parseHeaders(rawHeaders[i], styles[i]));
        }

        for (i = 0; i < rawCells.length; ++i) {
            const row = [];
            for (let ii = 0; ii < headers.length; ++ii) {
                row.push(parseCells(rawCells[i][ii], styles[ii]));
            }
            cells.push(row);
        }

        return buildTable(headers, cells);
    }
    // parse multi column tables
    text = text.replace(tableRegex, parseTable);

    // parse one column tables
    text = text.replace(singleColumnRegex, parseTable);

    return text;
}
