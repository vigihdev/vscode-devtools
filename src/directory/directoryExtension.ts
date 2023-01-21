import {
    languages, TextLine, Range,
    ExtensionContext, TextDocument, Position,
    CancellationToken, CompletionContext, CompletionItem
} from "vscode";

import { ActiveDocument } from './activeDocument';
import * as words from '../utils/words';

const TAG = 'Directory Extension';
const isEmpty = (t:string[]|string):boolean => ( Array.isArray(t) || typeof t === 'string' ) && t.length === 0;

export function DirectoryExtension(context: ExtensionContext){

    const documentSelector = ['*'];
    const lang = ['javascript', 'typescript', 'plaintext','php','json'];
    let triggerCharacter = ['.','/'];
    
    const provider = languages.registerCompletionItemProvider(documentSelector, {

        provideCompletionItems(
            document: TextDocument,
            position: Position,
            token: CancellationToken,
            ctx: CompletionContext) {

            const textLine: TextLine = document.lineAt(position.line)
            const completion: CompletionItem[] = [];
			const activeDoc = new ActiveDocument(textLine.text, document.uri);
			
			const text = words.find(textLine.text.split(' ').pop(),['.','/']);
			
			if(ctx.triggerCharacter){
				if( activeDoc.itemsCompletion.length > 0 ){
					return activeDoc.itemsCompletion;
				}
			}
            return completion;
        }

    }, ...triggerCharacter);
    context.subscriptions.push(provider);
}