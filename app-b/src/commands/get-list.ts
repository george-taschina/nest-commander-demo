import { Command } from "commander";
import { BaseCommand } from "./base-command";
import { batchSaveOrUpdateDocuments } from "../database";

export class GetListCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command("get-list")
      .description(
        "Ottieni la lista dei documenti da App A e salvali localmente"
      )
      .action(async () => {
        try {
          const documents = await this.apiClient.getDocuments();
          console.log("Documenti da App A:", documents);

          batchSaveOrUpdateDocuments(documents);

          console.log("Documenti salvati nel database locale!");
        } catch (error) {
          await this.handleError(error);
        }
      });
  }
}
