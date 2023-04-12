import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Tuto } from './app.component';

@NgModule({
  declarations: [
    Tuto
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [Tuto]
})
export class AppModule { }
