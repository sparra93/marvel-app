import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ComicService } from '../../shared/services/comic.service';

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
  private subscription: Subscription = null;

  constructor(private comicService: ComicService) { }

  ngOnInit() {
    this.getComics();
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
        console.log(this.comics);
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
    this.getComics(false, query);
  }

}
