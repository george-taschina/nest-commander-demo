import { Command } from "commander";
import { BaseCommand } from "./base-command";
import { saveOrUpdateDocumentLocally } from "../database";

export class GetCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command("get <id>")
      .description("Ottieni documento da App A e salvalo localmente")
      .action(async (id: number) => {
        try {
          const document = await this.apiClient.getDocument(id);
          console.log("Documento da App A:", document);

          await saveOrUpdateDocumentLocally(document);

          console.log("Documento salvato nel database locale!");
        } catch (error) {
          await this.handleError(error);
        }
      });
  }
}
