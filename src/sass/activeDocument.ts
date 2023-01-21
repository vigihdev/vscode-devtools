import {
    languages, TextLine, Range,
    ExtensionContext, TextDocument, Position,
    CancellationToken, CompletionContext, CompletionItem,
    SnippetString, MarkdownString, CompletionItemKind, Uri
} from "vscode";

import * as fspath from "../utils/fspath";
import * as words from "../utils/words";
import * as path from "path";
import * as net from "net";
import * as fs from "fs";
import * as child_process from "child_process";
import { Completion } from '../vs/completion';
import { inArray } from "../utils/array2";
import { Constants } from "../constant";

const TAG = 'Directory Extension';

export class ActiveDocument {
	
    private pathName:string;

	itemsCompletion:Completion[];

	constructor(textLine:string,uri:Uri){
		let text = textLine;
			text = text.split(' ').pop();
			text = this.cleanPath(text)

			if( inArray(text.charAt(0),['.','/']) ){
				let uriDir = path.parse(uri.fsPath).dir;
				this.pathName = path.join(uriDir,text);
				if( fs.existsSync(this.pathName)){
					this.init()
				}
				// console.log(text);
				// console.log(this.pathName);
			}

	}

	private init():void{
		const items : Completion[] = [];
		fspath.find(this.pathName).forEach(p => {
			let fullname = path.join(this.pathName,p)

			const _item = new Completion(
					p,( fspath.isDir(fullname) ? CompletionItemKind.Folder : CompletionItemKind.File),
					'a',Constants.ExtensionName + ' ' + TAG + ' directory '
				)
			items.push(_item);
		});

		this.itemsCompletion = items;
	}

	private cleanPath(text:string):string{
		return text.replace(/["']+/g,'')
	}

}
