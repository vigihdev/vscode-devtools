import * as path from 'path';
import * as fs from 'fs';
import * as fspath from "../utils/fspath";
import { isArray, isObject } from '../common/types';

// require __DIR__ . '/../vendor/autoload.php';
// require __DIR__ . '/../vendor/yiisoft/yii2/Yii.php';
// $config = require __DIR__ . '/../config/web.php';

type listDir = {
	vendor: string,
	composer: string,
	vendorAutoload: string,
	yii2: string
}

const log = (...arg):void => console.log(arg);
const isEmpty = (t:string|string[]):boolean => t.length === 0;

const TAG = 'FsPathYii2';

export class FsPathYii2 {

	private fullname: string;

	yii2Dir:listDir;
	constructor(fullname: string) {
		this.fullname = fullname;
		
		if ( !isEmpty(fullname) && this.isValidYii2()) {
			this.init()
		}
	}

	private init() {
		if(this.isValidYii2()){
			log('My Name Valid')
		}
	}

	public isValidYii2(): boolean {
		this.yii2Dir = FsPathYii2.scandirYii2(this.fullname);
		return isObject(this.yii2Dir);
	}

	static scandirYii2(fullname:string):listDir|undefined{
		const info = path.parse(fullname);
		const result : listDir[] = [];

		if( fullname && !isEmpty(fullname) && fs.existsSync(info.dir) ){
			fspath.split(info.dir).forEach((p:string,i:number )=> {
				const dir = fspath.subPath(info.dir,i);
				if(dir){
					const vendor = path.join(fspath.subPath(info.dir,i),...['vendor'] );
					const yii2Path = path.join(fspath.subPath(info.dir,i),...['vendor', 'yiisoft','yii2'] );
					const vendorAutoload = path.join(fspath.subPath(info.dir,i),...['vendor', 'autoload.php'] );
					const composerPath = path.join(fspath.subPath(info.dir,i),...['vendor', 'composer'] );
					if( 
						fs.existsSync(vendor) &&
						fs.existsSync(vendorAutoload) &&
						fs.existsSync(composerPath) &&
						fs.existsSync(yii2Path) 
					){
						
						result.push({
							vendor: vendor,
							yii2: yii2Path,
							composer: composerPath,
							vendorAutoload: vendorAutoload
						})
					}
				}
			})
		}

		// Array Values result
		if( isArray(result) && result.length > 0 && isObject(result[0]) ){
			const resValues : listDir = result[0];
			return resValues;
		}
		return undefined;
	}
}