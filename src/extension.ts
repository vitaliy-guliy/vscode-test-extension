/**********************************************************************
 * Copyright (c) 2023 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ***********************************************************************/

import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    context.subscriptions.push(vscode.commands.registerCommand('test.test-input', async () => {

        const port = await vscode.window.showInputBox({
            value: '8080',
            title: 'Exposed Port'
        });

        const exposure = await vscode.window.showQuickPick(['public', 'internal', 'none'], {
            title: 'Describe how the port should be exposed on the network'
        });

        await vscode.window.showInformationMessage(`Exposed port ${port}:${exposure}`);

    }));

}

// This method is called when your extension is deactivated
export function deactivate() { }
