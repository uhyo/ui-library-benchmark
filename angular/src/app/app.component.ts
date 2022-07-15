import { Component, NgZone } from "@angular/core";
import { itemMap, oneSetSize } from "../data/items";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private ngZone: NgZone) {}
  itemIds: string[] = Array.from(itemMap.keys()).slice(0, oneSetSize);
  input = "";
  searchQuery = "";

  ngOnInit() {
    globalThis.setDataSetRepeatSize = (size: number) => {
      this.ngZone.run(() => {
        this.itemIds = Array.from(itemMap.keys()).slice(0, size * oneSetSize);
      });
    };
  }

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
