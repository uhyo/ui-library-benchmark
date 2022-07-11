import { Component, createMemo, Show, Switch } from "solid-js";
import { itemMap } from "../../data/items";
import classes from "./Item.module.css";

type Props = {
  /**
   * ID of Item
   */
  id: string;
  /**
   * Search query, in lowercase
   */
  searchQuery: string;
};

export const Item: Component<Props> = (props) => {
  const item = () => itemMap.get(props.id);

  const nameMarked = createMemo(() => {
    const i = item();
    if (!i) {
      return undefined;
    }
    if (!props.searchQuery) {
      return {
        unmatched: false,
        prefix: i.en,
        mark: "",
        suffix: "",
      };
    }
    const name = i.en.toLowerCase();
    const searchIndex = name.indexOf(props.searchQuery);
    if (searchIndex === -1) {
      return {
        unmatched: true,
        prefix: i.en,
        mark: "",
        suffix: "",
      };
    }
    return {
      unmatched: false,
      prefix: i.en.substring(0, searchIndex),
      mark: i.en.substring(searchIndex, searchIndex + props.searchQuery.length),
      suffix: i.en.substring(searchIndex + props.searchQuery.length),
    };
  });

  return (
    <Show when={item() !== undefined && nameMarked() !== undefined}>
      <div classList={{ [classes.wrapper]: true }}>
        <div classList={{ [classes.id]: true }}>{item()!.id}</div>
        <div>
          <span
            classList={{
              [classes.name]: true,
              [classes.unmatchedName]: nameMarked()!.unmatched,
            }}
          >
            {nameMarked()!.prefix}
            <Show when={nameMarked()!.mark}>
              <mark>{nameMarked()!.mark}</mark>
            </Show>
            {nameMarked()!.suffix}
          </span>
        </div>
        <div>{item()!.ja}</div>
      </div>
    </Show>
  );
};
