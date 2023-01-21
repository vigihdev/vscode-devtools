import {
    languages, TextLine, Range,
    ExtensionContext, TextDocument, Position,
    CancellationToken, CompletionContext, CompletionItem
} from "vscode";


const TAG = 'Bootstrap Extension';
const isEmpty = (t:string[]|string):boolean => ( Array.isArray(t) || typeof t === 'string' ) && t.length === 0;

export function bootstrapExtension(context: ExtensionContext){

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
			
            return completion;
        }

    }, ...triggerCharacter);
    context.subscriptions.push(provider);
}