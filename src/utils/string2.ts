import { isString } from "vscode-common/out/types";

const empty = (t:string[]):boolean => t.length === 0;

export function isEmpty(text:string|string[]):boolean{
	return ( Array.isArray(text) || isString(text) ) && text.length === 0;
}