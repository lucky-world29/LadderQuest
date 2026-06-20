import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { App } from './app';
import { GameBoard } from './features/game/game-board/game-board';

@NgModule({
  declarations: [
    App,
    GameBoard
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
