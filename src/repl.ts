import * as readline from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand, State } from "./state.js";

export function startREPL(state: State) {

    state.rl.prompt();
    
    state.rl.on("line", (input: string) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.rl.prompt();
            return;
        }

        const commandName = words[0];
        const cmd = state.commands[commandName];

        if (!cmd) {
            console.log(
                `Unknown command: "${commandName}". Type "help" for a list of commands.`,
            );
            state.rl.prompt();
            return;
        }

        try {
            cmd.callback(state);
        } catch (e) {
            console.log(e);
        }

        state.rl.prompt();
    });

    state.rl.prompt();

}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ");
}