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

    if (params) {
      let httpParams = new HttpParams();
      for (const param in params) {
        if (params.hasOwnProperty(param)) {
          const value = params[param];
          httpParams = httpParams.append(param, value);
        }
      }
      params = httpParams;
    }

    const response = this.httpService.get(`/comics`, params).pipe(share());
    response.subscribe(rs => {
      this.comics = rs;
    });

    return response;
  }
}
