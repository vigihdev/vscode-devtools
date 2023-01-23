import * as fs from "node:fs";
import * as path from "node:path";

export function readFileJson<T>(fullname: string): T | undefined {

	if (fullname.substr(-5) === '.json' && fs.existsSync(fullname)) {
		const data = fs.readFileSync(fullname, 'utf-8');
		return JSON.parse(data);
	}
	return undefined;

}


export async function readFileAsyncJson<T>(fullname: string): Promise<T | undefined> {

	if (fullname.substr(-5) === '.json' && fs.existsSync(fullname)) {
		const data = fs.readFileSync(fullname, 'utf-8');
		return JSON.parse(data);
	}
	return undefined;

}