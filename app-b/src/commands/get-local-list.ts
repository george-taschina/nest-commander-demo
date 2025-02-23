import { Command } from "commander";
import { BaseCommand } from "./base-command";
import { getLocalDocuments } from "../database";

export class GetLocalListCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command("get-local-list")
      .description("Ottieni la lista dei documenti salvati localmente")
      .action(async () => {
        try {
          const documents = await getLocalDocuments();
          console.log("Documenti da App B:", documents);
        } catch (error) {
          await this.handleError(error);
        }
      });
  }
}
