import { CancellationToken, CompletionContext, CompletionItem, CompletionItemKind, ExtensionContext, Position, Range, SnippetString, TextDocument, TextEditor, TextEditorEdit, TextLine, commands, languages, tests, workspace } from "vscode";
import { Constants } from "../constant";
import { Completion } from "../vs/completion";
import { toArray } from "../utils/words";
import path = require("node:path");
import fs = require("node:fs");
import { readFileAsyncJson, readFileJson } from "../utils/fsApi";
import { rtrim } from "../common/strings";
import { SnippetStrings } from "../vs/snippetStrings";

const TAG = 'Php Documentor Completion';
const commandPhpTypeData = 'PhpTypeData';

type snipetOption = {
	label: string,
	insertText: string,
	documentation: string
}

export function phpDocumentorCompletion(context: ExtensionContext) {

	let triggerCharacter = [' ', '@'];
	const provider = languages.registerCompletionItemProvider('php', {

		provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, ctx: CompletionContext) {

			const textLine: TextLine = document.lineAt(position.line);
			const text = document.lineAt(position.line).text.substr(0, position.character);

			if (/\*\s/g.test(text) && !/\*\s@[a-z]+.*?\s/g.test(text)) {
				return renderCompletionItemDocumentorTags(context, document, position);
			}
			return undefined;
		}
	}, ...triggerCharacter);

	//=== provider PhpType
	const providerPhpDataType = languages.registerCompletionItemProvider('php', {

		provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, ctx: CompletionContext) {

			const textLine: TextLine = document.lineAt(position.line);
			const text = document.lineAt(position.line).text.substr(0, position.character);
			const files = path.join(context.extensionPath, ...['vendor', 'comment-block', 'php-data-type.json']);
			const data = readFileJson<string[]>(files);

			if (/\*\s/g.test(text) && !new RegExp(data.join('|'), 'g').test(text)) {
				return renderCompletionItemDataType(context);
			}
			return undefined;
		}
	}, ...[' ']);

	context.subscriptions.push(...[provider, providerPhpDataType]);
	addListenerTextEditorCommand(context);
}

const renderCompletionItemDocumentorTags = async (context: ExtensionContext, document: TextDocument, position: Position): Promise<CompletionItem[] | undefined> => {
	const completion: CompletionItem[] = [];
	const files = path.join(context.extensionPath, ...['vendor', 'comment-block', 'php-documentor-tags.json']);
	const data = await readFileAsyncJson<string[]>(files);

	data.forEach(text => {
		const item = new Completion(text, CompletionItemKind.Snippet, 'a', TAG + "\n" + Constants.ExtensionName, '@ ' + text,
			new SnippetStrings(
				(toArray(document.lineAt(position.line).text).filter(t => t.text == '@').length > 0 ? '' : '@')
				+ rtrim(text, ' ') + ' ${1}'
			)
		);

		item.command = {
			arguments: [position, document, item.label],
			command: commandPhpTypeData,
			title: ''
		};
		completion.push(item);
	});
	return completion;
}

const renderCompletionItemDataType = async (context: ExtensionContext): Promise<CompletionItem[] | undefined> => {
	const completion: CompletionItem[] = [];
	const files = path.join(context.extensionPath, ...['vendor', 'comment-block', 'php-data-type.json']);
	const data = await readFileAsyncJson<string[]>(files);
	data?.forEach(text => {
		const item = new Completion(text, CompletionItemKind.TypeParameter,
			'a', TAG + "\n" + Constants.ExtensionName, text
		);
		completion.push(item);
	});
	return completion;
}


const addListenerTextEditorCommand = async (context: ExtensionContext): Promise<void> => {
	commands.registerTextEditorCommand(commandPhpTypeData, async (
		editor: TextEditor, edit: TextEditorEdit,
		position: Position, document: TextDocument, label: string
	) => {
		const files = path.join(context.extensionPath, ...['vendor', 'comment-block', 'php-data-type.json']);
		const data = await readFileAsyncJson<string[]>(files);
		const text = document.lineAt(position.line).text;

		return editor.insertSnippet(
			new SnippetString('${1|' + data.join(',') + '|}'),
			new Position(position.line, text.length)
		);
	})
}