import { Command } from "commander";
import { BaseCommand } from "./base-command";

export class UpdateCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command("update <id>")
      .description("Aggiorna un documento in App A")
      .option("-c, --content <content>", "content")
      .option("-o, --owner <owner>", "owner")
      .action(
        async (id: number, options: { content?: string; owner?: string }) => {
          try {
            if (!options.content && !options.owner) {
              console.error(
                "Devi fornire almeno un campo da aggiornare (content o owner)."
              );
              return;
            }

            const updateData: { content?: string; owner?: string } = {};
            if (options.content) updateData.content = options.content;
            if (options.owner) updateData.owner = options.owner;

            const document = await this.apiClient.updateDocument(
              id,
              updateData
            );
            console.log("Documento aggiornato in App A:", document);
          } catch (error) {
            await this.handleError(error);
          }
        }
      );
  }
}
