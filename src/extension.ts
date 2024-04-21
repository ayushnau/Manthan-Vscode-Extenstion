import * as vscode from "vscode";
import axios from "axios";
import {TodoPanel} from "./TodoPanel"

export async function activate(context: vscode.ExtensionContext) {
  // register a command that opens a cowsay-document
  context.subscriptions.push(
    vscode.commands.registerCommand("getUserView", async () => {
      TodoPanel.createOrShow(context.extensionUri)
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("saveNotes-command", async () => {
     
      
    })
  );
 

  // register a command that updates the current cowsay
  context.subscriptions.push(
    vscode.commands.registerCommand("updateNotes-command", async () => {
      console.log("update running>>>");
      
    })
  );
}

export function deactivate() {}
