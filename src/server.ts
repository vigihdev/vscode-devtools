
import * as path from "path";
import * as net from "net";
import * as http from "http";
import * as fs from "fs";
import * as child_process from "child_process";
import { spawn, ChildProcess } from "node:child_process";
import { Readable } from 'stream';
import { PromiseSocket, TimeoutError } from "promise-socket"

const socket = new PromiseSocket(new net.Socket());
// const co = async () => await socket.connect(3000);

export function test() {
	socket.connect(3000);
	const loader = path.join(__dirname, ...['../', 'vendor', 'bin', 'server.php']);
	// spawn("php", [loader]);
	console.log(loader);
	const file = '/Users/thrubus/vscode/Extension/vscode-devtools/vendor/bin/yii2.php';
	
	const prosess = spawn('php',['-r','include(\"'+file+'\"); echo sava();'])
	prosess.stdout.on('data', (data) => {
		let str = new String(data);
		
		console.log(
			JSON.parse(
				JSON.stringify(str.replace(/[']+/g,'')) 
			)
		);
	});
}

