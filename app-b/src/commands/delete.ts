import { Command } from "commander";
import { BaseCommand } from "./base-command";

export class DeleteCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command("delete <id>")
      .description("Elimina un documento in App A")
      .action(async (id: number) => {
        try {
          await this.apiClient.deleteDocument(id);
          console.log("Documento eliminato con successo!");
        } catch (error) {
          await this.handleError(error);
        }
      });
  }
}
