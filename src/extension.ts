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
    vscode.window.showInformationMessage('TEST');

    context.subscriptions.push(vscode.commands.registerCommand('test.test-input', async () => {
        vscode.window.showInformationMessage('TEST INPUT');

    }));

}

// This method is called when your extension is deactivated
export function deactivate() { }
