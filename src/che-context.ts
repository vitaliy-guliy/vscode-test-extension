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
import { CheSecretStorage } from './che-secret-storage';

export class CheContext implements vscode.ExtensionContext {

    private secretStorage: CheSecretStorage;

    constructor(private readonly context: vscode.ExtensionContext) {
        console.log('> CheContext :: constructor');

        this.secretStorage = new CheSecretStorage(context.secrets);
    }

	get subscriptions() {
		return this.context.subscriptions;
	}

	get globalState() {
		return this.context.globalState;
	}

	get workspaceState() {
		return this.context.workspaceState;
	}

	get secrets() {
		// return this.context.secrets;
        return this.secretStorage;
	}

	get extensionUri() {
		return this.context.extensionUri;
	}

	get extensionPath() {
		return this.context.extensionPath;
	}

	get environmentVariableCollection() {
		return this.context.environmentVariableCollection;
	}

	asAbsolutePath(relativePath: string): string {
		return this.context.asAbsolutePath(relativePath);
	}

	get storageUri() {
		return this.context.storageUri;
	}

	get storagePath() {
		return this.context.storagePath;
	}

	get globalStorageUri() {
		return this.context.globalStorageUri;
	}

	get globalStoragePath() {
		return this.context.globalStoragePath;
	}

	get logUri() {
		return this.context.logUri;
	}

	get logPath() {
		return this.context.logPath;
	}

	get extensionMode() {
		return this.context.extensionMode;
	}

	get extension() {
		return this.context.extension;
	}

	get extensionRuntime() {
		return (this.context as any).extensionRuntime;
	}

}
