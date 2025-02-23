import { Command } from "commander";
import figlet from "figlet";
import { LoginCommand } from "./commands/login";
import { GetListCommand } from "./commands/get-list";
import { GetCommand } from "./commands/get";
import { SaveCommand } from "./commands/save";
import { DeleteCommand } from "./commands/delete";
import { UpdateCommand } from "./commands/update";
import { GetLocalListCommand } from "./commands/get-local-list";

const program = new Command();

console.log(`${figlet.textSync("Application B Manager")} \n`);

program.version("1.0.0").description("A CLI for managing application B");

new DeleteCommand().register(program);
new UpdateCommand().register(program);
new SaveCommand().register(program);
new LoginCommand().register(program);
new GetCommand().register(program);
new GetListCommand().register(program);
new GetLocalListCommand().register(program);

program.parse(process.argv);
