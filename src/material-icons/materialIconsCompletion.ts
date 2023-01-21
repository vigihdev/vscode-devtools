import { CancellationToken, CompletionContext, CompletionItem, CompletionItemKind, ExtensionContext, Position, TextDocument, TextLine, languages } from "vscode";
import * as svgIcons from "@vigihdev/material-icons/src/data.json";
import { isEmpty } from "../utils/string2";
import { isArray } from "vscode-common/out/types";
import { Constants } from "../constant";
import { Completion } from "../vs/completion";
import path = require("path");


const TAG = 'Material Icons Completion';

export function materialIconsCompletion(context: ExtensionContext) {

    let triggerCharacter = ['-', '>'];
    const provider = languages.registerCompletionItemProvider('php', {

        provideCompletionItems(
            document: TextDocument,
            position: Position,
            token: CancellationToken,
            context: CompletionContext) {

            const textLine: TextLine = document.lineAt(position.line);
            const text = document.lineAt(position.line).text.substr(0, position.character);
            const completion: CompletionItem[] = [];

            if (text.endsWith('>')) {
                console.log('activate');
            }
            if (!isEmpty(svgIcons) && isArray(svgIcons)) {
                // const svgView = 
                svgIcons.map(t => t.replace(/\.svg/g, '')).forEach(icon => {
                    const item = new Completion(
                        icon, CompletionItemKind.Field,
                        'a', Constants.ExtensionName + ' ' + TAG,
                        'Icon : ' + icon
                    )
                    completion.push(item);
                });
            }
            console.log(text);

            return completion;
        }
    }, ...triggerCharacter);

    context.subscriptions.push(provider);
}
