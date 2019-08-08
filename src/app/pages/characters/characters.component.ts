import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../shared/services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters: any[] = [];

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getAll().subscribe(data => {
      this.characters = data;
      console.log(data);
    });
  }

}
