import { ExtensionContext } from "vscode";
import * as net from "node:net";

import { DirectoryExtension } from './directory/directoryExtension';
import { yii2Extension } from './yii2/yii2Extension';
import { MaterialIconsExtension } from "./material-icons/materialIconsExtension";
import { bootstrapExtension } from "./bootstrap/bootstrapExtension";
import { commentBlockCompletion } from "./comment-block/commentBlockCompletion";


export async function activate(context: ExtensionContext): Promise<void> {

    console.log('Extension Context activate');

    // == server
    phpServer();

    // == ExtensionContext
    DirectoryExtension(context);
    MaterialIconsExtension(context);
    bootstrapExtension(context);
    commentBlockCompletion(context);
    // yii2Extension(context);
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
            console.log('Php Server Deso address : ' + info.address + ' port : ' + info.port + ' family : ' + info.family);
        })
    });
    serverOptions();
}
