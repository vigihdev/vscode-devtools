import {
    languages, TextLine, Range,
    ExtensionContext, TextDocument, Position,
    CancellationToken, CompletionContext, CompletionItem,
    SnippetString, MarkdownString, CompletionItemKind, Uri
} from "vscode";

import { inArray } from "../utils/array2";
import { Constants } from "../constant";

const TAG = 'Directory Extension';

export class ActiveDocument {
	constructor(){
	}
}
