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
}
