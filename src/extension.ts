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

            let sessionSilent = await vscode.authentication.getSession('github', scopes, { silent: true });
            if (sessionSilent) {
                out.appendLine('>> Session RECEIVED silently');
                return;
            }

            let session1 = await vscode.authentication.getSession('github', scopes, { createIfNone: true });
            // let session = await vscode.authentication.getSession('github', scopes);

            if (session1) {
                out.appendLine('>> Session1 received, everything is OK');
            } else {
                out.appendLine('>> Session1 IS NOT RECEIVED!');
            }

            let session2 = await vscode.authentication.getSession('github', scopes, { silent: true });
            // let session = await vscode.authentication.getSession('github', scopes);

            if (session2) {
                out.appendLine('>> Session2 received, everything is OK');
            } else {
                out.appendLine('>> Session2 IS NOT RECEIVED!');
            }

        }
    }));
}

// This method is called when your extension is deactivated
export function deactivate() { }
