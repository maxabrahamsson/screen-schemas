// cli.ts
import yargs from "yargs";
import { generateJSON } from "./screenDescriptor";

yargs.command(
  "$0 <screensDirectory> <jsonPath>",
  "Generate routes JSON file",
  (yargs) => {
    yargs.positional("screensDirectory", {
      describe: "Directory to scan for .tsx files",
      type: "string",
    });
    yargs.positional("jsonPath", {
      describe: "Path to export json file",
      type: "string",
    });
  },
  (argv) => {
    generateJSON(argv.screensDirectory as string, argv.jsonPath as string);
  }
).argv;
