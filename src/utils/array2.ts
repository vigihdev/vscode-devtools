import { isString } from "../common/types";

const isEmpty = (t: string | string[]): boolean => (Array.isArray(t) || isString(t)) && t.length === 0;

export function arrCurent(t: string[]): string {
	return isEmpty(t) ? '' : t.slice(0, 1).pop();
}

export function arrNext(t: string[]) {
	return isEmpty(t) && t.length < 2 ? '' : t.slice(0, 2).pop();
}

export function arrEnd(t: string[]): string {
	return isEmpty(t) ? '' : t.pop();
}

export function inArray(needle: string, haystack: string[]): boolean {
	return haystack.filter(h => h === needle).length > 0;
}

export function arrIsEmpty(t: string[]): boolean {
	return t.length === 0;
}