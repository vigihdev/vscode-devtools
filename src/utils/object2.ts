import { isObject } from "../common/types";


export function isEmptyObj<T>(obj:T):boolean{
	return isObject(obj) && Object.keys(obj).length === 0;
}

