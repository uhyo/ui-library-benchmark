import json from "./data.json";

export type Pokemon = {
  id: number;
  en: string;
  ja: string;
};

export const pokemonMap = new Map<number, Pokemon>(
  Object.values(json).map((pokemon) => [pokemon.id, pokemon])
);
