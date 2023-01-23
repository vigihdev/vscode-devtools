import {
    languages, TextLine, Range,
    ExtensionContext, TextDocument, Position,
    CancellationToken, CompletionContext, CompletionItem
} from "vscode";

import { ActiveDocument } from './activeDocument';
import * as words from '../utils/words';
import { getBoolean } from "../utils/parse";
import { Constants } from "../constant";

const TAG = 'Directory Extension';
const isEmpty = (t:string[]|string):boolean => ( Array.isArray(t) || typeof t === 'string' ) && t.length === 0;

export function DirectoryExtension(context: ExtensionContext){

    const lang = ['javascript', 'typescript', 'plaintext','php','json'];
    let triggerCharacter = ['.','/'];
    
    const provider = languages.registerCompletionItemProvider(lang, {

        provideCompletionItems(
            document: TextDocument,
            position: Position,
            token: CancellationToken,
            ctx: CompletionContext) {

            const textLine: TextLine = document.lineAt(position.line)
            const completion: CompletionItem[] = [];
			const activeDoc = new ActiveDocument(textLine.text, document.uri);
			
			const text = words.find(textLine.text.split(' ').pop(),['.','/']);
			if(
                getBoolean(Constants.configuration('completionDirectory')) &&
                ctx.triggerCharacter
            ){
				if( activeDoc.itemsCompletion.length > 0 ){
					return activeDoc.itemsCompletion;
				}
			}
            return undefined;
        }

    }, ...triggerCharacter);
    context.subscriptions.push(provider);
}