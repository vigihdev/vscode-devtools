import { CancellationToken, CompletionContext, CompletionItem, CompletionItemKind, ExtensionContext, Position, SnippetString, TextDocument, TextLine, commands, languages, tests, workspace } from "vscode";
import { Constants } from "../constant";
import { Completion } from "../vs/completion";
import { getBoolean } from "../utils/parse";
import { phpDocumentorCompletion } from "./phpDocumentorCompletion";
import { strFirstPositionChar } from "../utils/string2";
import path = require("node:path");
import { readFileJson } from "../utils/fsApi";
import { SnippetStrings } from "../vs/snippetStrings";

const TAG = 'Comment Block Completion';

type snipetOption = {
    label: string,
    insertText: string,
    documentation: string
}

export function commentBlockCompletion(context: ExtensionContext) {

    const lang = ['php', 'javascript', 'html'];
    let triggerCharacter = ['/'];
    const provider = languages.registerCompletionItemProvider(lang, {

        provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, ctx: CompletionContext) {

            const textLine: TextLine = document.lineAt(position.line);
            const text = document.lineAt(position.line).text.substr(0, position.character);
            const valid = strFirstPositionChar(/\?>/g, document.getText());

            if (getBoolean(Constants.configuration('commentBlockCompletion')) && valid && valid.idx > position.line) {
                return renderSnipetsComment(context);
            }
            return undefined;
        }
    }, ...triggerCharacter);

    context.subscriptions.push(provider);

    //== completion
    phpDocumentorCompletion(context)
}


const renderSnipetsComment = (context: ExtensionContext): CompletionItem[] | undefined => {
    const completion: CompletionItem[] = [];
    const files = path.join(context.extensionPath, ...['vendor', 'comment-block', 'snipets-comment.json']);
    readFileJson<snipetOption[]>(files)?.forEach((t: snipetOption) => {
        const item = new Completion(
            t.label, CompletionItemKind.Snippet,
            'a', TAG + "\n" + Constants.ExtensionName,
            'Comment : ' + t.documentation, new SnippetStrings(t.insertText)
        );
        completion.push(item);
    });
    return completion;

}

const test = (context: ExtensionContext): void => {
};