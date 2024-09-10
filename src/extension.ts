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
import { commands } from 'vscode';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    context.subscriptions.push(vscode.commands.registerCommand('test.run-task', async () => {
        const task = 'test-sql';
        const container = 'mariadb';
        
        const action = await vscode.window.showInformationMessage(`Running a task [${task}] in container [${container}]`, 'Run', 'Cancel');
        if ('Run' === action) {
            commands.executeCommand('workbench.action.tasks.runTask', `devfile: test-sql`);
        }

    }));

}

// This method is called when your extension is deactivated
export function deactivate() { }
