
import {
	ExtensionContext, commands, Uri, window, ViewColumn, Webview
} from 'vscode';
import { getFontSvg } from './materialIconsSvg';
import { materialIconsCompletion } from './materialIconsCompletion';

export function MaterialIconsExtension(context: ExtensionContext) {

	materialIconsCompletion(context);
	
	context.subscriptions.push(
		commands.registerCommand('materialIconsView.show', () => {
			materialIconsViewPanel.show(context.extensionUri);
		})
	);
}


class materialIconsViewPanel {

	public static readonly viewType = 'materialIconsView';

	public static show(extensionUri: Uri) {
		const column = window.activeTextEditor
			? window.activeTextEditor.viewColumn
			: undefined;

		const panel = window.createWebviewPanel(
			materialIconsViewPanel.viewType,
			"Matrial Icons View",
			column || ViewColumn.One
		);

		panel.webview.html = this._getHtmlForWebview(panel.webview, extensionUri);
	}

	private static _getHtmlForWebview(webview: Webview, extensionUri: Uri) {

		// Get resource paths
		const codiconsUri = webview.asWebviewUri(Uri.joinPath(extensionUri, 'node_modules', '@vigihdev/material-icons', 'dist', 'material-icons.css'));

		return `<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${codiconsUri}" rel="stylesheet" />
				<title>Material Icons View</title>
			</head>
			<body>
				<div class="view-material-icons page-title">Material Icons View</div>
				<div class="material-icons-container">
					${getFontSvg().join('')}
				</div>
			</body>
		</html>`;
	}
}

