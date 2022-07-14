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
  ...sortById(withPrefixedId("p1", pokemon)),
  ...sortById(withPrefixedId("m1", move)),
  ...sortById(withPrefixedId("i1", item)),
  ...sortById(withPrefixedId("l1", location)),
  ...sortById(withPrefixedId("p2", pokemon)),
  ...sortById(withPrefixedId("m2", move)),
  ...sortById(withPrefixedId("i2", item)),
  ...sortById(withPrefixedId("l2", location)),
  ...sortById(withPrefixedId("p3", pokemon)),
  ...sortById(withPrefixedId("m3", move)),
  ...sortById(withPrefixedId("i3", item)),
  ...sortById(withPrefixedId("l3", location)),
  ...sortById(withPrefixedId("p4", pokemon)),
  ...sortById(withPrefixedId("m4", move)),
  ...sortById(withPrefixedId("i4", item)),
  ...sortById(withPrefixedId("l4", location)),
  ...sortById(withPrefixedId("p5", pokemon)),
  ...sortById(withPrefixedId("m5", move)),
  ...sortById(withPrefixedId("i5", item)),
  ...sortById(withPrefixedId("l5", location)),
  ...sortById(withPrefixedId("p6", pokemon)),
  ...sortById(withPrefixedId("m6", move)),
  ...sortById(withPrefixedId("i6", item)),
  ...sortById(withPrefixedId("l6", location)),
  ...sortById(withPrefixedId("p7", pokemon)),
  ...sortById(withPrefixedId("m7", move)),
  ...sortById(withPrefixedId("i7", item)),
  ...sortById(withPrefixedId("l7", location)),
  ...sortById(withPrefixedId("p8", pokemon)),
  ...sortById(withPrefixedId("m8", move)),
  ...sortById(withPrefixedId("i8", item)),
  ...sortById(withPrefixedId("l8", location)),
]);

function withPrefixedId(
  prefix: string,
  items: readonly Item[]
): [string, Item][] {
  return items.map((item) => [`${prefix}${item.id}`, { ...item }]);
}

function sortById(
  arr: (readonly [string, Item])[]
): (readonly [string, Item])[] {
  return arr.sort((a, b) => {
    return a[1].id - b[1].id;
  });
}
