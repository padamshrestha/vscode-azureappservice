/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { commands, ProgressLocation, window } from "vscode";
import { DialogResponses, IAzureNode } from "vscode-azureextensionui";
import { SiteTreeItem } from "../explorer/SiteTreeItem";
import { ext } from '../extensionVariables';

export async function enableFileLogging(node: IAzureNode<SiteTreeItem>): Promise<void> {
    await ext.ui.showWarningMessage(`Do you want to enable file logging for ${node.treeItem.client.fullName}? The web app will be restarted.`, { modal: true }, DialogResponses.yes);
    const enablingLogging: string = `Enabling Logging for "${node.treeItem.client.fullName}"...`;
    const enabledLogging: string = `Enabled Logging for "${node.treeItem.client.fullName}".`;
    await window.withProgress({ location: ProgressLocation.Notification, title: enablingLogging }, async (): Promise<void> => {
        ext.outputChannel.appendLine(enablingLogging);
        // tslint:disable-next-line:no-non-null-assertion
        await node.treeItem.enableHttpLogs();
        await commands.executeCommand('appService.Restart', node);
        window.showInformationMessage(enabledLogging);
        ext.outputChannel.appendLine(enabledLogging);
    });
}
