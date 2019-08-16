import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CharactersComponent } from './characters/characters.component';
import { CharacterService } from '../shared/services/character.service';
import { CoreModule } from '../@core/core.module';
import { ComicsComponent } from './comics/comics.component';
import { ComicService } from '../shared/services/comic.service';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    CoreModule
  ],
  providers: [CharacterService, ComicService],
  declarations: [CharactersComponent, ComicsComponent]
})
export class PagesModule { }
