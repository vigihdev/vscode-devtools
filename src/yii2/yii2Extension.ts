import {
    languages, TextLine, Range,
    ExtensionContext, TextDocument, Position,
    CancellationToken, CompletionContext, CompletionItem, window, workspace, TextDocumentShowOptions, TextDocumentChangeEvent
} from "vscode";
import { FsPathYii2 } from "./fsPathYii2";
import { spawn } from "node:child_process";
import internal = require("node:stream");
import { serverRun } from "./yii2Server";


const TAG = 'Yii2 Extension';
const isEmpty = (t:string[]|string):boolean => ( Array.isArray(t) || typeof t === 'string' ) && t.length === 0;
const log = (...arg):void => console.log(arg);

export function yii2Extension(context: ExtensionContext){

    console.log(TAG);
    // console.log(context);

    workspace.onDidOpenTextDocument((document:TextDocument) => {
        const uri = document.uri;
        if( document.languageId === 'php'){
            const pathYii2 = new FsPathYii2(uri.path);
            if( pathYii2.isValidYii2()){
            }
        }
    });

    workspace.onDidChangeTextDocument((event:TextDocumentChangeEvent) => {
    });

    let triggerCharacter = ['-','>'];
    const provider = languages.registerCompletionItemProvider('php', {

        provideCompletionItems(
            document: TextDocument,
            position: Position,
            token: CancellationToken,
            ctx: CompletionContext) {

            const textLine: TextLine = document.lineAt(position.line)
            const completion: CompletionItem[] = [];

            const uri = document.uri;
            const pathYii2 = new FsPathYii2(uri.path);
            if( pathYii2.isValidYii2()){
                // serverRun();
                log(pathYii2.yii2Dir.vendor)
            }
            return completion;
        }

    }, ...triggerCharacter);
    context.subscriptions.push(provider);
}
