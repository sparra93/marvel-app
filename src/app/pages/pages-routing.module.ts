import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { ComicsComponent } from './comics/comics.component';

const routes: Routes = [
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: 'comics',
    children: [
      {
        path: '',
        component: ComicsComponent
      },
      {
        path: ':id',
        component: ComicsComponent
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'characters'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
