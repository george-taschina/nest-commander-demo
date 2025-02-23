import { Command } from "commander";
import { BaseCommand } from "./base-command";

export class LoginCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command("login <username> <password>")
      .description("Esegui il login in App A")
      .action(async (username: string, password: string) => {
        try {
          await this.apiClient.login(username, password);
          console.log("Login effettuato con successo!");
          console.log("Token salvato per le chiamate future.");
        } catch (error) {
          await this.handleError(error);
        }
      });
  }
}
