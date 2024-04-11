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
import { CheContext } from './che-context';

export async function activate(context: vscode.ExtensionContext): Promise<void> {

    context.subscriptions.push(vscode.commands.registerCommand('test.setup-context', async () => {
        try {
            const cheContext = new CheContext(context);
            await vscode.commands.executeCommand('setContext', 'dev.workspace', !!cheContext);
            
            await vscode.window.showInformationMessage('Che context is set up');
        } catch (error) {
            await vscode.window.showErrorMessage(`Failure to setup Che context: ${error.message}`);
        }
    }));

}

// This method is called when your extension is deactivated
export function deactivate() { }
