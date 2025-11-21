import { PokeCache } from "./pokecache.js";

export class PokeAPI {
    readonly #cache: PokeCache;
    private static readonly baseURL = "https://pokeapi.co/api/v2";
  
    constructor(readonly cache: PokeCache) {
      this.#cache = cache;
    }
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      const key = pageURL || `${PokeAPI.baseURL}/location-area/`;
      const cachedLocations = this.#cache.get<ShallowLocations>(key);
    if (cachedLocations !== undefined) {
        console.log(`Cached locations found for ${key}`);
        return cachedLocations;
      }
        try {
            const locations = await fetch(key);
            if (locations.ok) {
                const locationsData = await locations.json();
                this.#cache.add<ShallowLocations>(key, locationsData);
                return locationsData; 
            } else {
                throw new Error(`Failed to fetch locations with status ${locations.status}`);
            }
        } catch (e) {
            throw new Error(`Failed to fetch locations: ${e}`);
        }
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
      const key = `${PokeAPI.baseURL}/location-area/${locationName}`;
      const cachedLocation = this.#cache.get<Location>(key);
      if (cachedLocation !== undefined) {
        console.log(`Cached locations found for ${key}`);
        return cachedLocation;
      }
      try {
        const location = await fetch(key);
        if (location.ok) {
          const locationData = await location.json();
          this.#cache.add<Location>(key, locationData);
          return locationData;
        } else {
          throw new Error(`Failed to fetch locations with status ${location.status}`);
        }
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
