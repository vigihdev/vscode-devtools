
import { 
	CompletionItem, CompletionItemKind, MarkdownString, 
	Position, Range, SnippetString, TextDocument } from 'vscode';

// phpUse
// phpNamespace
// phpClass
// phpFunctions
// phpExtends
// phpVaribles

// textWords
// htmlClass
// htmlId

export class Documents {
	private document:TextDocument;

	constructor( document: TextDocument ) {
		this.document = document;
	}

	private init():void{

	}

	getDollarVariable():void{}
}

