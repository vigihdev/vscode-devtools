import * as path from "node:path";
import * as fs from "node:fs";
import * as internal from "node:stream";
import { spawn } from "node:child_process";

const BinServer = 'vendor/bin/yii2-server.php';
const PHPServer = path.join(__dirname,...['../../',BinServer]);

export function serverRun(){

	if(fs.existsSync(PHPServer)){
		const client = spawn('php',['-r','include(\"'+PHPServer+'\")']);
		client.stdout.on('data',(chunk:internal.Readable) => {
			console.log(chunk);
		});
	}
}