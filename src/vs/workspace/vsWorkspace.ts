
import { WorkspaceConfiguration, workspace } from 'vscode';

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
}

