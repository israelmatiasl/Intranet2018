import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';

import { API_URL } from "../../helpers/constants";
import { SesionService } from '../sesion/sesion.service';
import { Room } from '../../models/salon.model';

@Injectable()
export class ColegioService {

  constructor(private _http:HttpClient,
              private _sesion:SesionService) { }

  getSchools(type:string, word:string, page:number=1){
    let queries = `page=${page}`
    if (type) queries = `${type}=${word}&${queries}`;
    let url = `${API_URL}/rooms?${queries}`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.get(url, { headers })
      .map((res:any) => {
        return res;
      });
  }

  getSchool(){
    let url = `${API_URL}/school`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.get(url, { headers })
      .map((res:any) => {
        return res;
      });
  }

  saveSchool(room:Room){
    let url = `${API_URL}/room`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.post(url, room, { headers })
      .map((res:any) => {
        return res.roomStored;
      });
  }

  updateSchool(_id:string, room:Room){
    let url = `${API_URL}/room/${_id}`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.put(url, room, { headers })
      .map((res:any) => {
        return res;
      });
  }
}
