import { Injectable } from '@angular/core';
import { HttpService } from '../../@core/services/http.service'
import { Observable, of } from 'rxjs';
import { share } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CharacterService {

  characters: any = null;

  constructor(private httpService: HttpService) { }

  getAll(persistent: boolean = true, params: any): Observable<any> {
    if (persistent && this.characters && this.characters.data.length > 0) {
      return of(this.characters);
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

    const response = this.httpService.get(`/characters`, params).pipe(share());
    response.subscribe(rs => {
      this.characters = rs;
    });

    return response;
  }

}
