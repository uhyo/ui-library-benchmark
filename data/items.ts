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
  ...sortById(withPrefixedId("p1_", pokemon)),
  ...sortById(withPrefixedId("m1_", move)),
  ...sortById(withPrefixedId("i1_", item)),
  ...sortById(withPrefixedId("l1_", location)),
  ...sortById(withPrefixedId("p2_", pokemon)),
  ...sortById(withPrefixedId("m2_", move)),
  ...sortById(withPrefixedId("i2_", item)),
  ...sortById(withPrefixedId("l2_", location)),
  ...sortById(withPrefixedId("p3_", pokemon)),
  ...sortById(withPrefixedId("m3_", move)),
  ...sortById(withPrefixedId("i3_", item)),
  ...sortById(withPrefixedId("l3_", location)),
  ...sortById(withPrefixedId("p4_", pokemon)),
  ...sortById(withPrefixedId("m4_", move)),
  ...sortById(withPrefixedId("i4_", item)),
  ...sortById(withPrefixedId("l4_", location)),
  ...sortById(withPrefixedId("p5_", pokemon)),
  ...sortById(withPrefixedId("m5_", move)),
  ...sortById(withPrefixedId("i5_", item)),
  ...sortById(withPrefixedId("l5_", location)),
  ...sortById(withPrefixedId("p6_", pokemon)),
  ...sortById(withPrefixedId("m6_", move)),
  ...sortById(withPrefixedId("i6_", item)),
  ...sortById(withPrefixedId("l6_", location)),
  ...sortById(withPrefixedId("p7_", pokemon)),
  ...sortById(withPrefixedId("m7_", move)),
  ...sortById(withPrefixedId("i7_", item)),
  ...sortById(withPrefixedId("l7_", location)),
  ...sortById(withPrefixedId("p8_", pokemon)),
  ...sortById(withPrefixedId("m8_", move)),
  ...sortById(withPrefixedId("i8_", item)),
  ...sortById(withPrefixedId("l8_", location)),
  ...sortById(withPrefixedId("p9_", pokemon)),
  ...sortById(withPrefixedId("m9_", move)),
  ...sortById(withPrefixedId("i9_", item)),
  ...sortById(withPrefixedId("l9_", location)),
  ...sortById(withPrefixedId("p10_", pokemon)),
  ...sortById(withPrefixedId("m10_", move)),
  ...sortById(withPrefixedId("i10_", item)),
  ...sortById(withPrefixedId("l10_", location)),
  ...sortById(withPrefixedId("p11_", pokemon)),
  ...sortById(withPrefixedId("m11_", move)),
  ...sortById(withPrefixedId("i11_", item)),
  ...sortById(withPrefixedId("l11_", location)),
  ...sortById(withPrefixedId("p12_", pokemon)),
  ...sortById(withPrefixedId("m12_", move)),
  ...sortById(withPrefixedId("i12_", item)),
  ...sortById(withPrefixedId("l12_", location)),
]);

export const oneSetSize = itemMap.size / 12;

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
