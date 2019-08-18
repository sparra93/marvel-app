import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpService } from '../../@core/services/http.service'
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class CharacterService {

  characters: any = null;

  constructor(private httpService: HttpService) { }

  getAll(persistent: boolean = true, params: any): Observable<any> {
    if (persistent && this.characters && this.characters.data.length > 0) {
      return of(this.characters);
    }

    const _params: HttpParams = this.httpService.trasnformParameter(params);

    const response = this.httpService.get(`/characters`, _params).pipe(share());

    response.subscribe(rs => {
      this.characters = rs;
    });

    return response;
  }

}
