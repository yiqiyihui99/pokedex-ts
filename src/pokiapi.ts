export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
  
    constructor() {}
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        try {
            const locations = await fetch(pageURL || `${PokeAPI.baseURL}/location-area/`);
            if (locations.ok) {
                return await locations.json(); 
            } else {
                throw new Error(`Failed to fetch locations with status ${locations.status}`);
            }
        } catch (e) {
            throw new Error(`Failed to fetch locations: ${e}`);
        }
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
      try {
        const location = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
        return await location.json();
      } catch (e) {
        throw new Error(`Failed to fetch location: ${e}`);
      }
    }
  }
  
  export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
  };
  
  export type Location = {
    id: number;
    name: string;
    pokemon_encounters: {
      pokemon: { name: string; url: string };
    }[];
  };
