import { State } from "./state.js";

export async function commandCatch(state:State, ...args: string[]): Promise<void> {
    const pokemonName = args[0];
    if (!pokemonName) {
        console.error("No Pokemon name provided");
        return;
    }
    try {
        const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    } catch (error) {
        console.error(`Invalid pokemon ${pokemonName}: ${error}`);
        return;
    }
};

