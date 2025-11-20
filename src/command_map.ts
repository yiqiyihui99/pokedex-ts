import { State } from "./state.js";

export async function commandMap(state: State) {
    const locations = state.nextLocationsURL ? await state.pokeAPI.fetchLocations(state.nextLocationsURL) : await state.pokeAPI.fetchLocations();
    console.log(locations.results.map((location) => location.name).join("\n"));
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}

export async function commandMapb(state: State) {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    };
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    console.log(locations.results.map((location) => location.name).join("\n"));
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
};