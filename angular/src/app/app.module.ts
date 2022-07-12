import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { SearchBoxComponent } from "./components/search-box/search-box.component";
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [AppComponent, SearchBoxComponent, ItemComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
