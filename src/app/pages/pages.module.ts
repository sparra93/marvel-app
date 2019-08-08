import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CharactersComponent } from './characters/characters.component';
import { CharacterService } from '../shared/services/character.service';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  providers:[CharacterService],
  declarations: [CharactersComponent]
})
export class PagesModule { }
