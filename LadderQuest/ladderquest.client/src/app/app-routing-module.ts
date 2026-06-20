import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameBoard } from './features/game/game-board/game-board';

const routes: Routes = [
  {
    path: 'game',
    component: GameBoard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
