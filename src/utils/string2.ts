import { isObject, isString } from "../common/types";


export type ArrString = {
	idx: number,
	text: string
};
export function isEmpty(text: string | string[]): boolean {
	return (Array.isArray(text) || isString(text)) && text.length === 0;
}

export function strFirstPositionChar(regex: RegExp, str: string): ArrString {
	const result: ArrString[] = [];
	str.split('\n').forEach((text: string, i: number) => {
		if (regex.test(text)) {
			result.push({ idx: i, text: text });
		}
	});
	return result?.slice(0, 1).pop()
}

export function strEnd(needle: string, haystack: string): boolean {
	return haystack.charAt(haystack.length - 1) === needle;
}

export function strStart(needle: string, haystack: string): boolean {
	return haystack.charAt(0) === needle;
}
