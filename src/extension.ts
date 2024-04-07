import * as vscode from "vscode";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
export async function activate(context: vscode.ExtensionContext) {
  const response = await axios.get("https://blog.webdevsimplified.com/rss.xml");
  //   console.log(response);
  const articles = new XMLParser()
    .parse(response.data)
    .rss.channel.item.map((article: any) => {
      return {
        label: article.title,
        description: article.description,
        link: article.link,
      };
    });

  let disposable = vscode.commands.registerCommand(
    "saveNotes-command",
    async () => {
      const article: any = await vscode.window.showQuickPick(articles, {
        matchOnDetail: true,
      });

      if (!article) return;
      vscode.env.openExternal(article.link);
      console.log(article);
      //   vscode.window.showInformationMessage("saving the notes");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
