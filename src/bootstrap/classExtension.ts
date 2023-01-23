import { languages, TextLine, Range, ExtensionContext, TextDocument, Position, CancellationToken, CompletionContext, CompletionItemKind } from "vscode";
import * as path from "node:path";
import { readFileAsyncJson } from "../utils/fsApi";
import { arrIsEmpty } from "../utils/array2";
import { Completion } from "../vs/completion";
import { Constants } from "../constant";
import { wordPosition } from "../utils/words";
import { strEnd, strStart } from "../utils/string2";

const TAG = 'Bootstrap Class Extension';

export function classExtension(context: ExtensionContext) {

	const lang = ['javascript', 'php', 'html'];
	let triggerCharacter = [' '];
	const provider = languages.registerCompletionItemProvider(lang, {

		provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, ctx: CompletionContext) {

			const textLine: TextLine = document.lineAt(position.line)
			const completion: Completion[] = [];
			const text = document.lineAt(position.line).text.substr(0, position.character);
			const words = wordPosition('class', text);

			if (/class/g.test(text) && words && words.start < position.character) {

				if (!/>/g.test(words.text)) {
					return renderClasses(context, document, position);
				}
			}
			return undefined
		}

	}, ...triggerCharacter);
	context.subscriptions.push(provider);
}

const renderClasses = async (context: ExtensionContext, document: TextDocument, position: Position): Promise<Completion[] | undefined> => {
	const completion: Completion[] = [];
	const files = path.join(context.extensionPath, ...['vendor', 'bootstrap', 'classes.json']);
	const data = await readFileAsyncJson<string[]>(files);

	if (data && !arrIsEmpty(data)) {
		const textLine = document.lineAt(position.line).text;
		const text1 = textLine.substr(0, position.character);
		const text2 = textLine.substr(text1.length, textLine.length);
		const keyChar = 'class';
		let wordPost = wordPosition(keyChar, text1);

		data.forEach(text => {
			const item = new Completion(text, CompletionItemKind.Class, 'a',
				TAG + "\n" + Constants.ExtensionName,
				'CLass : ' + text
			);
			if (!strEnd(' ', wordPost.text)) {
				const first = wordPost.text.split(' ')?.pop().length
				if (first) {

					const postChar = (wordPost.text.length + wordPost.start + keyChar.length) - first;
					item.range = new Range(new Position(position.line, postChar), position)
				}
			}
			completion.push(item);
		});
	}
	return completion;

}