import { workspace } from "vscode";

type configOption = "completionDirectory" 
	| "completionYii2" 
	| "completionBootstrap" 
	| "completionMaterialIcon"
	| "completionSass"
	| "commentBlockCompletion"
	| "completionSqlYii2";

export class Constants {
	static ExtensionId = 'vscode-devtools';
	static ExtensionIds = 'vigihdev.vscode-devtools';
	static ExtensionName = 'Vscode DevTools';

	static configuration(configOption:configOption):any{
		return workspace.getConfiguration().get<{}>(Constants.ExtensionId + '.' + configOption)
	}
}