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

export class CheSecretStorage implements vscode.SecretStorage {

    readonly onDidChange: vscode.Event<vscode.SecretStorageChangeEvent>;

    constructor(private readonly storage: vscode.SecretStorage) {
        console.log('> CheSecretStorage :: constructor');

        // const onDidChangeEmitter = new vscode.EventEmitter<vscode.SecretStorageChangeEvent>();
        // this.onDidChange = onDidChangeEmitter.event;

        this.onDidChange = storage.onDidChange;
    }

    get(key: string): Thenable<string> {
        console.log(`> CheSecretStorage :: get [${key}]`);

        return this.storage.get(key);
        // return 'dummy-value';
        // throw new Error('Method not implemented.');
    }

    store(key: string, value: string): Thenable<void> {
        console.log(`> CheSecretStorage :: store [${key}] value [${value}]`);

        return this.storage.store(key, value);
        // throw new Error('Method not implemented.');
    }

    delete(key: string): Thenable<void> {
        console.log(`> CheSecretStorage :: delete [${key}]`);

        return this.storage.delete(key);
        // return Promise.resolve();
        // throw new Error('Method not implemented.');
    }

}
