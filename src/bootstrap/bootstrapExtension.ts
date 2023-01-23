import { ExtensionContext } from "vscode";
import { styleExtension } from "./styleExtension";
import { Constants } from "../constant";
import { getBoolean } from "../utils/parse";
import { classExtension } from "./classExtension";


const TAG = 'Bootstrap Extension';

export function bootstrapExtension(context: ExtensionContext) {

    if (getBoolean(Constants.configuration('completionBootstrap'))) {
        styleExtension(context);
        classExtension(context);
    }
}