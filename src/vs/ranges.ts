import { 
	CompletionItem, CompletionItemKind, MarkdownString, 
	Position, Range, SnippetString, TextDocument } from 'vscode';


export class Ranges {
	private document: TextDocument;
	private position: Position;
	private textPrefix: string;
	private textPrefixArr: string[];
	private textLine: string;
	private line: number;

	constructor(document: TextDocument, position: Position) {
		this.document = document;
		this.position = position;
		this.line = position.line;
		this.textPrefix = document.lineAt(position).text.substr(0, position.character);
		this.textLine = document.lineAt(position).text;
		this.textPrefixArr = this.textPrefix.split('');
	}

	// startOffSpace(): Range | undefined {
	// 	const start: number[] = [];

	// 	this.textPrefixArr.forEach((v: string, i: number) => {
	// 		if (v.charCodeAt(0) === CharCode.Space) {
	// 			start.push(i + 1);
	// 		}
	// 	});
	// 	const position: Position = start.length === 0 ?
	// 		new Position(this.line, 0) :
	// 		new Position(this.line, Util.lastIndex(start));
	// 	return start.length === 0 ? undefined : new Range(new Position(this.line, Util.lastIndex(start)), this.position);
	// }

	// startOffLine(): Range {
	// 	return new Range(new Position(this.line, 0), this.position);
	// }

	// startOffEndOfLine(): Range {
	// 	return new Range(new Position(this.line, 0), new Position(this.line, this.textLine.length));
	// }

	// lastIndex(charCode?: CharCode): Range {
	// 	if (charCode !== undefined) {
	// 		const result: number[] = [];
	// 		this.textPrefixArr.forEach((v: string, i: number) => {
	// 			if (v.charCodeAt(0) === charCode) {
	// 				result.push(i);
	// 			}
	// 		});
	// 		return result.length === 0 ? undefined :
	// 			new Range(new Position(this.line, result[0]), this.position);
	// 	}
	// 	return new Range(new Position(this.line, this.textPrefix.length), this.position);
	// }
}