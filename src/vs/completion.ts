
import { CompletionItem, CompletionItemKind } from 'vscode';
import { MarkdownStrings } from './markdownString';
import { SnippetStrings } from './snippetStrings';

export class Completion extends CompletionItem {
	label: string;
	insertText: string | SnippetStrings;
	documentation?: string | MarkdownStrings;
	detail?: string;
	sortText?: string;

	public constructor(
		label: string,
		kind?: CompletionItemKind,
		sortText?: string,
		detail?: string,
		documentation?: string | MarkdownStrings,
		insertText?: string | SnippetStrings
	) {
		const kinds = kind === undefined ? CompletionItemKind.Function : kind;
		super(label, kind);
		this.label = label;
		this.kind = kinds;
		this.sortText = sortText;
		this.detail = detail;
		this.documentation = documentation
		this.insertText = insertText;
	}

}

