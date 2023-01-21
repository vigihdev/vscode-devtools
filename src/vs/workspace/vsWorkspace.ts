
import { WorkspaceConfiguration, workspace } from 'vscode';
import { isObject } from 'vscode-common/out/types';

const log = (...arg):void => console.log(arg);
const isSame = (a:string,b:string):boolean => a === b;

// let all = vscode.workspace.getConfiguration();
// let allAsJSON = JSON.parse(JSON.stringify(all)); 
// console.log(context);
// const configuredView = vscode.workspace.getConfiguration().get(Constants.ExtensionId)
// console.log(allAsJSON);
// console.log(configuredView);

// export class VsWorkspace {

export function getConfigurations():WorkspaceConfiguration{
	return workspace.getConfiguration();
}

export function getConfiguration(extensionId:string){
	const configuration = workspace.getConfiguration();

					// 4) Get the current value
							const currentValue = configuration.get<{}>('vscode-devtools.completionBootstrap');
							log(currentValue,configuration)
	if(isObject(getConfigurations())){
		log(getConfigurations().get(extensionId))
	}
}

