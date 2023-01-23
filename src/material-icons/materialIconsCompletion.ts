import { CancellationToken, CompletionContext, CompletionItem, CompletionItemKind, ExtensionContext, Position, TextDocument, TextLine, languages, tests, workspace } from "vscode";
import * as svgIcons from "@vigihdev/material-icons/src/data.json";
import { isEmpty } from "../utils/string2";
import { isArray } from "../common/types";
import { Constants } from "../constant";
import { Completion } from "../vs/completion";
import { wordPosition } from "../utils/words";
import { isEmptyObj } from "../utils/object2";
import { getBoolean } from "../utils/parse";


const TAG = 'Material Icons Completion';

export function materialIconsCompletion(context: ExtensionContext) {

    const lang = ['php', 'javascript', 'html'];
    let triggerCharacter = ['>', '\t', ' '];
    const provider = languages.registerCompletionItemProvider(lang, {

        provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, ctx: CompletionContext) {

            const textLine: TextLine = document.lineAt(position.line);
            const text = document.lineAt(position.line).text.substr(0, position.character);
            const word = wordPosition('class', text);
            const completion: CompletionItem[] = [];

            if (getBoolean(Constants.configuration('completionMaterialIcon'))) {
                // <div class="body-content material-icons"></div>
                if (!isEmptyObj(word) && /.*(material-icons)/g.test(word.text)) {
                    if (!/<\/|\?>/g.test(word.text)) {
                        return renderCompletionItem();
                    }
                }

                // <?= Html::tag('div','content',['class' => 'material-icons']) ?>
                if (/class.*?material-icons/g.test(textLine.text)) {
                    if (/<?=\sHtml::tag/g.test(textLine.text)) {
                        const word = wordPosition('class', textLine.text);
                        if (word && word.start > position.character) {
                            return renderCompletionItem();
                        }
                    }
                }

            }
            return undefined;
        }
    }, ...triggerCharacter);

    context.subscriptions.push(provider);
}

const renderCompletionItem = (): CompletionItem[] | undefined => {
    const completion: CompletionItem[] = [];
    if (!isEmpty(svgIcons) && isArray(svgIcons)) {
        svgIcons.map(t => t.replace(/\.svg/g, '')).forEach(icon => {
            const item = new Completion(
                icon, CompletionItemKind.Field,
                'a', TAG + "\n" + Constants.ExtensionName,
                'Icon : ' + icon
            )
            completion.push(item);
        });
        return completion;
    }
    return undefined;
}

const test = (context: ExtensionContext): void => {
};