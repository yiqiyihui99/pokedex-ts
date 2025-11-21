import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { PokeAPI } from "./pokiapi.js";
import { PokeCache } from "./pokecache.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const commands = {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exits the Pokedex",
            callback: commandExit,
        },
        map: {
            name: "map",
            description: "Displays a list of ordered locations given an optional page URL",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays a list of ordered locations given a previous page URL",
            callback: commandMapb,
        },
        // TODO: Add more commands here
    }

    const cache = new PokeCache(5000);
    const pokeAPI = new PokeAPI(cache);

    return {rl, commands, pokeAPI, nextLocationsURL: null, prevLocationsURL: null};
}
