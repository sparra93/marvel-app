import { Injectable } from '@angular/core';
import { HttpService } from '../../@core/services/http.service'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class CharacterService {

  constructor( private httpService: HttpService) { }

  getAll(): Observable<any>{
    return this.httpService.get(`/characters`);
  }

}
