import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "manthan" is now active!');

  let disposable = vscode.commands.registerCommand("manthan.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from manthan!");
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
