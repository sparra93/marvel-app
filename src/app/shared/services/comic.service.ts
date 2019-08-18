import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpService } from '../../@core/services/http.service'
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { share } from 'rxjs/internal/operators/share';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  comics: any = null;

  constructor(private httpService: HttpService) { }

  getAll(persistent: boolean = true, params: any): Observable<any> {
    if (persistent && this.comics && this.comics.data.length > 0) {
      return of(this.comics);
    }

    const _params: HttpParams = this.httpService.trasnformParameter(params);

    const response = this.httpService.get(`/comics`, _params).pipe(share());

    response.subscribe(rs => {
      this.comics = rs;
    });

    return response;
  }

  getCharacterComics(persistent: boolean = true, params: any, id: number,): Observable<any> {
    // if (persistent && this.comics && this.comics.data.length > 0) {
    //   return of(this.comics);
    // }

    const _params: HttpParams = this.httpService.trasnformParameter(params);

    const response = this.httpService.get(`/comics/${id}`, _params).pipe(share());

    response.subscribe(rs => {
      this.comics = rs;
    });

    return response;
  }
}
