import * as vscode from "vscode";
import axios from "axios";
import { TodoPanel } from "./TodoPanel";
import { SidebarProvider } from "./SidebarProvider";

export async function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  item.text = "$(beaker) Add Todo";
  item.command = "addtodos";
  item.show();

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "Manthan-sidebar",
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("addtodos", async () => {
      // TodoPanel.createOrShow(context.extensionUri);
      await vscode.commands.executeCommand(
        "workbench.view.extension.manthan-sidebar-view"
      );
    }),

    vscode.commands.registerCommand("Manthan.refresh", async () => {
      TodoPanel.kill();

      setTimeout(() => {
        vscode.commands.executeCommand(
          "workbench.action.webview.openDeveloperTools"
        );
      }, 500);
      // TodoPanel.createOrShow(context.extensionUri);
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.manthan-sidebar-view"
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("saveNotes-command", async () => {})
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("updateNotes-command", async () => {})
  );
}

export function deactivate() {}
