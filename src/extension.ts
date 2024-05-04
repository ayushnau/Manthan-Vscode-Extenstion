import * as vscode from "vscode";
import axios from "axios";
import { TodoPanel } from "./TodoPanel";
import { SidebarProvider } from "./SidebarProvider";

export async function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  item.text = "$(beaker) Add Todo";
  item.command = "vstodo.addTodo";
  item.show();

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "Manthan-sidebar",
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("addtodos", async () => {
      TodoPanel.createOrShow(context.extensionUri);
    }),

    vscode.commands.registerCommand("Manthan.refresh", async () => {
      TodoPanel.kill();
      TodoPanel.createOrShow(context.extensionUri);
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.manthan-sidebar-view"
      );

      setTimeout(() => {
        vscode.commands.executeCommand(
          "workbench.action.webview.openDeveloperTools"
        );
      }, 500);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("saveNotes-command", async () => {})
  );

  // register a command that updates the current cowsay
  context.subscriptions.push(
    vscode.commands.registerCommand("updateNotes-command", async () => {
      console.log("update running>>>");
    })
  );
}

export function deactivate() {}
