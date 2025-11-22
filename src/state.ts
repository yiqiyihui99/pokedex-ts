import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { PokeAPI, Pokemon } from "./pokiapi.js";
import { PokeCache } from "./pokecache.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
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
        explore: {
            name: "explore",
            description: "Explores a given location and displays the Pokemon encountered",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempts to catch a given Pokemon",
            callback: commandCatch,
        }
        // TODO: Add more commands here
    }

    const cache = new PokeCache(5000);
    const pokeAPI = new PokeAPI(cache);

    return {rl, commands, pokeAPI, nextLocationsURL: null, prevLocationsURL: null, pokedex: {}};
}
