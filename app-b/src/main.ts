import { Command } from "commander";
import figlet from "figlet";

const program = new Command();

console.log(`${figlet.textSync("Application B Manager")} \n`);

if (process.argv[2] === undefined) {
  console.log("Run command with arg '-h' to list all available options...");
}

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-l, --ls  [value]", "List directory contents")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .parse(process.argv);

const options = program.opts();
