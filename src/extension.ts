import {
    languages, TextLine, Range,
    ExtensionContext, TextDocument, Position,
    CancellationToken, CompletionContext, CompletionItem
} from "vscode";
import * as fs from "node:fs";
import * as path from "node:path";
import * as net from "node:net";
import { spawn } from "node:child_process";

import { DirectoryExtension } from './directory/directoryExtension';
import { yii2Extension } from './yii2/yii2Extension';
import { MaterialIconsExtension } from "./material-icons/materialIconsExtension";


const log = (...arg): void => console.log(arg);
const log1 = (arg): void => console.log(arg);

export async function activate(context: ExtensionContext): Promise<void> {

    console.log('activate');

    // == server
    phpServer();

    // == ExtensionContext
    DirectoryExtension(context);
    MaterialIconsExtension(context);
    // yii2Extension(context);

    let triggerCharacter = ['-', '>'];
    const provider1 = languages.registerCompletionItemProvider('php', {

        provideCompletionItems(
            document: TextDocument,
            position: Position,
            token: CancellationToken,
            context: CompletionContext) {

            const textLine: TextLine = document.lineAt(position.line)
            const completion: CompletionItem[] = [];

            return completion;
        }
    }, ...triggerCharacter);

    context.subscriptions.push(provider1);
}

async function phpServer(): Promise<void> {
    const serverOptions = () => new Promise((resolve, reject) => {
        const server = net.createServer(socket => {
            socket.on('end', () => {
                console.log('PHP process disconnected')
            })
            server.close()
            resolve({ reader: socket, writer: socket })
        })
        server.listen(0, '127.0.0.1', () => {
            const info : net.AddressInfo = JSON.parse(JSON.stringify(server.address()))
            console.log('address : ' + info.address + ' port : ' + info.port + ' family : ' + info.family);
        })
    });
    serverOptions();
}
