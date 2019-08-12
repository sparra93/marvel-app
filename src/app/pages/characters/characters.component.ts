import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterService } from '../../shared/services/character.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {

  characters: any[] = [];
  resultsInfo: any = {};
  page: number = 1;
  loading: boolean;
  private subscription: Subscription = null;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.getCharacters();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
  }

  getCharacters(persistent: boolean = true, params: any = null): void {
    this.loading = true;
    if (this.subscription) {
      this.subscription.unsubscribe;
    }

    this.subscription = this.characterService.getAll(persistent, params)
      .subscribe(response => {
        this.characters = response.data;
        this.resultsInfo = response.results;
        this.page = response.results.offset / response.results.limit + 1;
        this.loading = false;
      }, erro => { this.loading = false;});
  }

  onPageChange($event: any): void {
    const query = {
      offset: $event * this.resultsInfo.limit - this.resultsInfo.limit,
      limit: this.resultsInfo.limit
    }
    this.getCharacters(false, query);
  }
}
