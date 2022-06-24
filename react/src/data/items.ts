import pokemon from "./pokemon.json";
import move from "./move.json";
import item from "./item.json";

export type Item = {
  id: number;
  en: string;
  ja: string;
};

export const itemMap = new Map<string, Item>([
  ...Object.values(pokemon).map(
    (pokemon) => [`p${pokemon.id}`, pokemon] as const
  ),
  ...Object.values(move).map((move) => [`m${move.id}`, move] as const),
  ...Object.values(item).map((item) => [`i${item.id}`, item] as const),
]);
