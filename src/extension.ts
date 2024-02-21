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
    context.subscriptions.push(vscode.commands.registerCommand('secrets.add-secret', async () => {
        const value = await vscode.window.showInputBox({
            value: 'secret message',
            title: 'Your Secret'
        });

        await context.secrets.store('mySecret', value);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('secrets.get-secret', async () => {
        try {
            const value = await context.secrets.get('mySecret');
            if (value) {
                await vscode.window.showInformationMessage(`Your Secret: ${value}`);
            } else {
                await vscode.window.showErrorMessage('Failure to get secret');
            }

        } catch (err) {
            console.error(err);
        }
    }));

    context.subscriptions.push(vscode.commands.registerCommand('secrets.delete-secret', async () => {
        await context.secrets.delete('mySecret');
        await vscode.window.showInformationMessage('Your Secret should be deleted');
    }));

}

// This method is called when your extension is deactivated
export function deactivate() { }
