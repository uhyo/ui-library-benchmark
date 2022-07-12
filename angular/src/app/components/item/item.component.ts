import { Component, Input } from "@angular/core";
import { itemMap } from "../../../data/items";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent {
  @Input() id!: string;
  @Input() searchQuery!: string;

  get item() {
    return itemMap.get(this.id);
  }

  get nameMarked() {
    if (!this.item) {
      return undefined;
    }
    if (!this.searchQuery) {
      return {
        unmatched: false,
        prefix: this.item.en,
        mark: "",
        suffix: "",
      };
    }
    const en = this.item.en;
    const name = en.toLowerCase();
    const searchIndex = name.indexOf(this.searchQuery);
    if (searchIndex === -1) {
      return {
        unmatched: true,
        prefix: en,
        mark: "",
        suffix: "",
      };
    }
    return {
      unmatched: false,
      prefix: en.substring(0, searchIndex),
      mark: en.substring(searchIndex, searchIndex + this.searchQuery.length),
      suffix: en.substring(searchIndex + this.searchQuery.length),
    };
  }
}
