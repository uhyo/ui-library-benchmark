import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.css"],
})
export class SearchBoxComponent {
  @Input() value: string = "";
  @Output() valueChange = new EventEmitter<string>();

  constructor() {}
}
