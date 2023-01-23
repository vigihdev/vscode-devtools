import { languages, TextLine, Range, ExtensionContext, TextDocument, Position, CancellationToken, CompletionContext, CompletionItem, CompletionItemKind, SnippetString, TextEditorEdit, TextEditor, commands, window } from "vscode";
import * as path from "node:path";
import { readFileAsyncJson } from "../utils/fsApi";
import { arrCurent } from "../utils/array2";
import { Completion } from "../vs/completion";
import { Constants } from "../constant";
import { SnippetStrings } from "../vs/snippetStrings";
import { toArray, wordPosition } from "../utils/words";

const TAG = 'Bootstrap Style Extension';
const OnselectedStyle = 'OnselectedStyle';


type emmetOption = {
	key: string,
	label: string,
	value: string
}

export function styleExtension(context: ExtensionContext) {

	const lang = ['javascript', 'php', 'html'];
	let triggerCharacter = [' '];
	const provider = languages.registerCompletionItemProvider(lang, {
		provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, ctx: CompletionContext) {

			const textLine: TextLine = document.lineAt(position.line)
			const completion: CompletionItem[] = [];
			const text = document.lineAt(position.line).text.substr(0, position.character);
			const words = wordPosition('style', text);

			if (/style/g.test(text) && words && words.start < position.character) {
				if (!/:/g.test(text.substr(-3))) {
					return renderCompletionItemCssKey(context, document, position);
				}
			}
		}

	}, ...triggerCharacter);

	// === providerValues
	const providerValues = languages.registerCompletionItemProvider(lang, {
		provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, ctx: CompletionContext) {

			const textLine: TextLine = document.lineAt(position.line)
			const completion: CompletionItem[] = [];
			const text = document.lineAt(position.line).text.substr(0, position.character);
			const words = wordPosition('style', text);

			if (/style/g.test(text) && words && words.start < position.character) {
				return renderCompletionItemCssValue(context, document, position);
			}
			return undefined
		}

	}, ...[' ']);

	context.subscriptions.push(...[provider, providerValues]);
	eventOnselectedStyle(context);
}

const renderCompletionItemCssValue = async (context: ExtensionContext, document: TextDocument, position: Position): Promise<CompletionItem[] | undefined> => {
	const completion: CompletionItem[] = [];
	const data = await emmmetStyle(context);
	let text = document.lineAt(position.line).text.substr(0, position.character);
	let mText = text.split(';').slice(-1).pop()
		.replace(/'/g, '"')
		.replace(/:/g, '')
		.replace(/\s/g, '')
	mText = mText.split('"').slice(-1).pop().trim();

	if (mText && data && data?.filter(t => t.label === mText).length > 0) {
		let mData = data?.filter(t => t.label === mText).slice(0, 1).pop()
		if (!/\$/g.test(mData.value)) {
			mData.value.split('|')?.forEach(text => {
				const item = new Completion(
					text, CompletionItemKind.Value,
					'a', TAG + "\n" + Constants.ExtensionName,
					'Style : ' + text,
				);
				completion.push(item);
			})
			return completion;
		}
	}
	return completion;
}

const renderCompletionItemCssKey = async (context: ExtensionContext, document: TextDocument, position: Position): Promise<CompletionItem[] | undefined> => {
	const completion: CompletionItem[] = [];
	const data = await emmmetStyle(context);
	data?.forEach((text: emmetOption) => {
		const item = new Completion(
			text.label, CompletionItemKind.Class,
			'a', TAG + "\n" + Constants.ExtensionName,
			'Style : ' + text.label,
			new SnippetStrings(text.label + ': ${1};')
		);
		item.command = {
			arguments: [position, document, item],
			command: OnselectedStyle,
			title: ''
		};
		completion.push(item);
	});
	return completion;
}

const eventOnselectedStyle = async (context: ExtensionContext): Promise<void> => {
	commands.registerTextEditorCommand(OnselectedStyle, async (editor: TextEditor, edit: TextEditorEdit, position: Position, document: TextDocument, item: Completion) => {
		const text = document.lineAt(position.line).text;
		const words = toArray(text);
		const insertValue = item.insertText['value'];
		const value = item.insertText['value'];

		const data = await emmmetStyle(context);
		if (data && data?.filter(f => f.label === item.label).length > 0) {
			let values = data?.filter(f => f.label === item.label).slice(0, 1).pop()?.value;
			let _word = words.filter(f => f.idx > position.character)?.filter(f => f.text === ";").slice(0, 1).pop();

			if (_word && values) {
				if (!/\$/g.test(values)) {
					return editor.insertSnippet(
						new SnippetStrings('${1|' + values.replace(/\|/g, ',') + '|}'),
						new Position(position.line, _word.idx)
					);
				} else {

					return editor.insertSnippet(
						new SnippetStrings(values),
						new Position(position.line, _word.idx)
					);
				}
			}
		}

	});
}


const emmmetStyle = async (context: ExtensionContext): Promise<emmetOption[]> => {
	const result: emmetOption[] = [];
	const files = path.join(context.extensionPath, ...['vendor', 'emmet', 'snippets', 'css.json']);
	const data = await readFileAsyncJson<Object>(files);

	Object.keys(data)?.forEach((val: string, i: number) => {
		let value: string = data[val];
		result.push({
			key: val,
			label: arrCurent(value.split(':')),
			value: value.split(':').slice(1).join(':')
		});
	})
	return result;
}