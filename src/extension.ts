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
        // const port = await vscode.window.showInputBox(
        //     {
        //         value: '8080',
        //         title: 'Exposed Port'
        //     }
        // );

        const port = await enterExposedPort();

        // const exposure = await vscode.window.showQuickPick(['public', 'internal', 'none'], {
        //     title: 'Describe how the port should be exposed on the network'
        // });

        const exposure = await enterExposure();

        await vscode.window.showInformationMessage(`Exposed port ${port}:${exposure}`);

    }));

}

async function enterExposedPort(/* component: devfile.Component */): Promise<number | undefined> {
    const port = await vscode.window.showInputBox({
        value: '8080',
        title: 'Exposed Port',

        validateInput: (value): string | vscode.InputBoxValidationMessage | undefined | null |
            Thenable<string | vscode.InputBoxValidationMessage | undefined | null> => {
            if (!value) {
                return {
                    message: 'Exposed port cannot be empty',
                    severity: vscode.InputBoxValidationSeverity.Error
                } as vscode.InputBoxValidationMessage;
            }

            const pValue: number = Number.parseInt(value);
            if (!Number.isInteger(pValue)) {
                return {
                    message: 'Only Integer is allowed',
                    severity: vscode.InputBoxValidationSeverity.Error
                } as vscode.InputBoxValidationMessage;
            }

            // if (component.container && component.container.endpoints) {
            //     if (component.container.endpoints.find(e => e.targetPort === pValue)) {
            //         return {
            //             message: 'This port is already exposed',
            //             severity: vscode.InputBoxValidationSeverity.Error
            //         } as vscode.InputBoxValidationMessage;
            //     }
            // }

            return undefined;
        }
    });

    return Number.parseInt(port);
}

async function enterExposure(): Promise<'public' | 'internal' | 'none' | undefined> {
    const dPublic = 'Endpoint will be exposed on the public network';
    const dInternal = 'Endpoint will be exposed internally outside of the main devworkspace POD';
    const dNone = 'Endpoint will not be exposed and will only be accessible inside the main devworkspace POD';

    const items: vscode.QuickPickItem[] = [
        {
            label: 'public',
            detail: dPublic
        },
        {
            label: 'internal',
            detail: dInternal
        },
        {
            label: 'none',
            detail: dNone
        }
    ];

    const item = await vscode.window.showQuickPick(items, {
        title: 'Describe how the port should be exposed on the network'
    });

    if (item) {
        switch (item.label) {
            case 'public':
                return 'public';
            case 'internal':
                return 'internal';
            case 'none':
                return 'none';
        }
    }

    return undefined;
}

// This method is called when your extension is deactivated
export function deactivate() { }
