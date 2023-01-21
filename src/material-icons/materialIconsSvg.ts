import * as path from "node:path";
import * as fs from "node:fs";
import {isEmpty} from "../utils/string2";
import { readFileSync } from "node:fs";


const SvgPath = ['node_modules','@vigihdev','material-icons','src','icons']
const mainPath = path.join(__dirname,...['../../'].concat(SvgPath));

export function getFontSvg():string[]{
	const result : string[] = [];

	if (fs.existsSync(mainPath)) {
		const process = fs.readdirSync(mainPath);
		if (!isEmpty(process)) {
			process.forEach(svg => {
				if( svg.substr(-4) === '.svg'){
					let name = svg.replace(/\.svg/g,'');
					try {
						const contents = readFileSync( mainPath + path.sep + svg,{encoding:"utf-8"});
						result.push(...[
							'<div class="card-material-icons">',
							'	<div class="card-media-svg">',
									contents,
							'	</div>',
							'	<div class="card-body-svg-title">',
									name,
							'	</div>',
							'</div>'
							
						])
					  } catch (err) {
						console.error(err.message);
					  }
				}
			});
		}
	}
	return result;
	
}