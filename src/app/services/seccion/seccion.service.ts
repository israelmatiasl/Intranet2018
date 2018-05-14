import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';

import { API_URL } from "../../helpers/constants";
import { SesionService } from '../sesion/sesion.service';
import { Room } from '../../models/salon.model';
import { Grade, Year, Section } from '../../models/seccion.model';

@Injectable()
export class SeccionService {

  constructor(private _http:HttpClient,
              private _sesion:SesionService) { }

  getSections(grade:string, gradeyear:string, type:string, year:number,page:number=1){
    let queries = `page=${page}`
    if (year) queries = `year=${year}&${queries}`;
    if (type) queries = `type=${type}&${queries}`;
    if (gradeyear) queries = `gradeyear=${gradeyear}&${queries}`;
    if (grade) queries = `grade=${grade}&${queries}`;
    let url = `${API_URL}/sections?${queries}`;
    //console.log(url);
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

  getSection(_id:string){
    let url = `${API_URL}/section/${_id}`;
    
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

  saveSection(section:Section){
    let url = `${API_URL}/section`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.post(url, section, { headers })
      .map((res:any) => {
        return res;
      });
  }

  updateSection(_id:string, section:Section){
    let url = `${API_URL}/section/${_id}`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.put(url, section, { headers })
      .map((res:any) => {
        return res;
      });
  }

  deleteSection(_id:string){
    let url = `${API_URL}/section/${_id}`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.delete(url, { headers })
      .map((res:any) => {
        return res;
      });
  }

  getList(){
    let url = `${API_URL}/rooms/simple`;

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

  getGrades(){
    let url = `${API_URL}/grades`;

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

  saveGrade(grade:Grade){
    let url = `${API_URL}/grade`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.post(url, grade, { headers })
      .map((res:any) => {
        return res;
      });
  }

  getYearGrades(grade:string){
    let url = `${API_URL}/yeargrades`;
    if(grade) url = `${url}?grade=${grade}`;

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

  saveYearGrade(year:Year){
    let url = `${API_URL}/yeargrade`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.post(url, year, { headers })
      .map((res:any) => {
        return res;
      });
  }

  getSectionsYears(){
    let url = `${API_URL}/sections/years`;

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
}
