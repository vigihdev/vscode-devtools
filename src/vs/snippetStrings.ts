import { CompletionItem, CompletionItemKind, MarkdownString, Position, Range, SnippetString, TextDocument } from 'vscode';


export class SnippetStrings extends SnippetString {
	value: string;

	constructor(value?: string) {
		super(value);
		this.value = value;
	}

	// append(str: string): SnippetStrings {
	// 	const value = this.value + str;
	// 	return new SnippetStrings(value);
	// }

	// prepend(str: string): SnippetStrings {
	// 	const value = str + this.value;
	// 	return new SnippetStrings(value);
	// }

	// removeDefauldArg(): SnippetStrings {
	// 	const regex = '\\$\\w+[=\\s]+.*?[,\\w+\\]]+|[,\\s+&]+\\$\\w+[=\\s]+.*?[,\\w+\\]]+';
	// 	return new SnippetStrings(this.value.replace(Util.getRegexGi(regex), ''));
	// }

	// toSnipetArg(): SnippetStrings {
	// 	const value = this.value;
	// 	const newValue = Util.argToSnipet(value);
	// 	return new SnippetStrings(newValue);
	// }

	// enscapeDolar(): SnippetStrings {
	// 	const value = this.value.replace(Util.getRegexGi('\\$'), '\\$');
	// 	return new SnippetStrings(value);
	// }
}