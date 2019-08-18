import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ComicService } from '../../shared/services/comic.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  comics: any[] = [];
  resultsInfo: any = {};
  page: number = null;
  loading: boolean;
  hassError: boolean;
  id: number = null;
  private subscription: Subscription = null;

  constructor(
    private comicService: ComicService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getParameter();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
  }

  getComics(persistent: boolean = true, params: any = null): void {
    this.loading = true;
    if (this.subscription) {
      this.subscription.unsubscribe;
    }

    this.subscription = this.comicService.getAll(persistent, params)
      .subscribe(response => {
        this.comics = response.data;
        this.resultsInfo = response.results;
        this.page = response.results.offset / response.results.limit + 1;
        this.loading = false;
      }, () => {
        this.loading = false;
        this.hassError = true;
      });
  }

  getCharacterComics(persistent: boolean = true, params: any = null, id: number): void {
    this.loading = true;
    if (this.subscription) {
      this.subscription.unsubscribe;
    }

    this.subscription = this.comicService.getCharacterComics(persistent, params, id)
      .subscribe(response => {
        this.comics = response.data;
        this.resultsInfo = response.results;
        this.page = response.results.offset / response.results.limit + 1;
        this.loading = false;
      }, () => {
        this.loading = false;
        this.hassError = true;
      });
  }

  onPageChange($event: any): void {
    const query = {
      offset: ($event - 1) * this.resultsInfo.limit,
      limit: this.resultsInfo.limit
    }

    if (this.id) {
      this.getCharacterComics(false, query, this.id);
    } else {
      this.getComics(false, query);
    }

  }

  private getParameter(): void {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      if (this.id) {
        this.getCharacterComics(false, null, this.id);
      } else {
        this.getComics();
      }
    });
  }

}
