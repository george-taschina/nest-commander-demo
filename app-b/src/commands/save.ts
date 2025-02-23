import { Command } from "commander";
import { BaseCommand } from "./base-command";

export class SaveCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command("save <content> <owner>")
      .description("Salva un documento in App A")
      .action(async (content: string, owner: string) => {
        try {
          const document = await this.apiClient.saveDocument({
            content,
            owner,
          });
          console.log("Documento salvato in App A:", document);
        } catch (error) {
          await this.handleError(error);
        }
      });
  }
}
