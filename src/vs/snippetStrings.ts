import { SnippetString } from 'vscode';


export class SnippetStrings extends SnippetString {
	value: string;

	constructor(value?: string) {
		super(value);
		this.value = value;
	}

	getValue(): string {
		return this.value;
	}
}