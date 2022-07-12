import pokemon from "./pokemon.json";
import move from "./move.json";
import item from "./item.json";
import location from "./location.json";

export type Item = {
  id: number;
  en: string;
  ja: string;
};

export const itemMap = new Map<string, Item>([
  ...sortById(
    Object.values(pokemon).map((pokemon) => [`p${pokemon.id}`, pokemon])
  ),
  ...sortById(Object.values(move).map((move) => [`m${move.id}`, move])),
  ...sortById(Object.values(item).map((item) => [`i${item.id}`, item])),
  ...sortById(Object.values(location).map((item) => [`l${item.id}`, item])),
]);

function sortById(
  arr: (readonly [string, Item])[]
): (readonly [string, Item])[] {
  return arr.sort((a, b) => {
    return a[1].id - b[1].id;
  });
}
