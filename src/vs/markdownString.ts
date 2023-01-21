import { 
	CompletionItem, CompletionItemKind, MarkdownString, 
	Position, Range, SnippetString, TextDocument } from 'vscode';

export class MarkdownStrings extends MarkdownString {

	constructor(value?: string, supportThemeIcons?: boolean) {
		super(value, supportThemeIcons);
	}

	setValue(value: string): MarkdownStrings {
		return new MarkdownStrings(value);
	}

	setHastag(str: string): MarkdownStrings {
		return new MarkdownStrings(str + '\n\n' + this.value);
	}

}