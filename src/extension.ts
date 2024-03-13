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

const DEFAULT = 'Default';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const out = vscode.window.createOutputChannel('Test Extension');
    out.show(true);
    out.appendLine('> Test vscode.authentication.getSession(...)');

    context.subscriptions.push(vscode.commands.registerCommand('test.test-get-session', async () => {
       
        const choose: string | undefined = await vscode.window.showQuickPick([
            DEFAULT,
            'user:email',
            'read:user',
            'read:user,user:email,repo,workflow'
        ], {
            title: 'Select scopes:'
        });

        if (choose) {
            let scopes = [];
            if (choose !== DEFAULT) {
                scopes.push(...choose.split(','));
            }

            out.appendLine(`\n> Get session for scopes [${scopes.toString()}]`);

            // let session = await vscode.authentication.getSession('github', scopes, { silent: !0 });
            let session = await vscode.authentication.getSession('github', scopes);

            if (session) {
                out.appendLine('>> Session received, everything is OK');
            } else {
                out.appendLine('>> Session IS NOT RECEIVED!');
            }
        }
    }));
}

// This method is called when your extension is deactivated
export function deactivate() { }
