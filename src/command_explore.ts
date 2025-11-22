import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const locationName = args[0];
    if (!locationName) {
        console.error("No location name provided");
        return;
    };
    try {
        const location = await state.pokeAPI.fetchLocation(locationName);
        const pokemon = location.pokemon_encounters.map((encounter) => ` - ${encounter.pokemon.name}\n `).join("");
        console.log(`Exploring ${locationName}...`);
        console.log("Found Pokemon:");
        console.log(pokemon);
    } catch (error) {
        console.error(`Error exploring ${locationName}: ${error}`);
    }
};
