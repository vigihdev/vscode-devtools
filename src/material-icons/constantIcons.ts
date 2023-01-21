import * as fs from "node:fs";
import * as path from "node:path";
import { Uri, Webview } from "vscode";

export const iconsWebviewUri = (webview: Webview, extensionUri: Uri): Uri => {
	return webview.asWebviewUri(Uri.joinPath(extensionUri, 'node_modules', '@vigihdev/material-icons', 'dist', 'material-icons.css'))
}

const SvgPath = ['node_modules', '@vigihdev', 'material-icons', 'src', 'icons']
export const IconPath = path.join(__dirname, ...['../../'].concat(SvgPath));

export function getSvgMaterialIcons(nameSvg: string): string {
	const fullname = IconPath + path.sep + nameSvg + '.svg';
	if(fs.existsSync(fullname)){
		const svg = fs.readFileSync(fullname,'utf8');
		return svg;
	}
	return '';
}

export function getCardIconsHtml(svg: string): string {
	return [
		'<div class="card-material-icons">',
		'	<div class="card-media-svg">',
				svg,
		'	</div>',
		'	<div class="card-body-svg-title">',
				svg.replace(/\.svg/g, ''),
		'	</div>',
		'</div>'
	].join('');
}

