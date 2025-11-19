export function commandHelp(state) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log("");
    for (const command in state.commands) {
        console.log(`${command}: ${state.commands[command].description}`);
    }
}
