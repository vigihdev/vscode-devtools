import { Position } from "vscode";
import { arrEnd } from "./array2";
import { isEmpty } from "./string2";

export type ArrWords = {
	idx:number,
	text:string
};

type PositionWords = {
	start:number,
	text:string
};

export function range(word:string, start:number,end:number):string{
	let words = [];
	if( start > end){
		return '';
	}
	toArray(word).filter(w => w.idx >= start && w.idx <= end)?.forEach(w => words.push(w.text));
	return words.join('');
}

export function find(word:string,haystack:string[]):ArrWords[]{

	const inArr = (needle:string[],haystack:string):boolean => needle.filter(n => n === haystack).length > 0;
	return toArray(word).filter(w => inArr(haystack,w.text));
}

export function sortDesc(word:ArrWords[]):ArrWords[]{
	return word.sort((a,b) => a.idx - b.idx);
}

export function sortAsc(word:ArrWords[]):ArrWords[]{
	return word.sort((a,b) => b.idx - a.idx);
}

export function first(word:string):string{
	return word.charAt(0);
}

export function end(word:string):string{
	return word.charAt((word.length - 1));
}

export function length(word:string):number{
	return word.length;
}

export function toArray(word:string):ArrWords[]{
	const results : ArrWords[] = [];
	word.split('').forEach((w:string,i:number )=> {
		results.push({idx:i,text:w});
	});
	return results;
}
//=
export function wordPosition(needle:string,word:string):PositionWords{
	const results = <PositionWords>{};
	if( !isEmpty(needle) && !isEmpty(word) ){
		const wordArr = word.split(needle);
		if( wordArr.length > 1 ){
			const textMain = wordArr.slice(0, (wordArr.length - 1) ).join(needle);
			results.start = textMain.length;
			results.text = wordArr.pop();
		}
	}
	return results;
}
