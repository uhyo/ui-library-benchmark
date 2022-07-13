import { Component } from "@angular/core";
import { itemMap } from "../data/items";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  input = "";
  searchQuery = "";

  itemIds = Array.from(itemMap.keys());

  onInput(value: string) {
    this.input = value;
    this.searchQuery = value.toLowerCase();
  }

  /**
   * Tell how to track changes of the collection to Angular.
   * @see https://angular.jp/guide/built-in-directives#tracking-items-with-ngfor-trackby
   */
  trackById(index: number, itemId: string) {
    return itemId;
  }
}
