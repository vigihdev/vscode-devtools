import * as fs from "node:fs";
import * as path from "node:path";

const exist = (pathName: string): boolean => fs.existsSync(pathName);
const empty = (t: string[]): boolean => t.length === 0;

export function find(pathName: string): string[] {
	const inArr = (haystack: string): boolean => ['.DS_Store'].filter(n => n !== haystack).length > 0;

	return exist(pathName) && !empty(fs.readdirSync(pathName)) ?
		fs.readdirSync(pathName).filter(inArr)
		: [];
}

export function isDir(fullname: string): boolean {
	return path.parse(fullname).ext.length === 0;
}

export function isFile(fullname: string): boolean {
	return path.parse(fullname).ext.length > 0;
}

export function getDir(fullname: string): string | undefined {
	return isDir(fullname) ? path.parse(fullname).dir : undefined;
}

export function getExt(fullname: string): string | undefined {
	return isFile(fullname) ? path.parse(fullname).ext : undefined;
}

export function split(fullname: string): string[] {
	return fullname.split(path.sep);
}

export function subPath(fullname: string, post: number): string | undefined {
	let result: string[] = [];
	if (fs.existsSync(fullname) && post > 0) {
		fullname.split(path.sep).forEach(p => result.push(p));
		return result.slice(0, post).join(path.sep)
	}
	return undefined;
}
