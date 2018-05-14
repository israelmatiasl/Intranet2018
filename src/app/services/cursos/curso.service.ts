import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';

import { API_URL } from "../../helpers/constants";
import { SesionService } from '../sesion/sesion.service';
import { Course } from '../../models/curso.model';

@Injectable()
export class CursoService {

  constructor(private _http:HttpClient,
              private _sesion:SesionService) { }

  getCourses(gradeyear:string, category:string,page:number=1){
    let queries = `page=${page}`
    if (category) queries = `category=${category}&${queries}`;
    if (gradeyear) queries = `gradeyear=${gradeyear}&${queries}`;
    let url = `${API_URL}/courses?${queries}`;
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

  getCourse(_id:string){
    let url = `${API_URL}/course/${_id}`;
    
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

  saveCourse(course:Course){
    let url = `${API_URL}/course`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.post(url, course, { headers })
      .map((res:any) => {
        return res;
      });
  }

  updateCourse(_id:string, course:Course){
    let url = `${API_URL}/course/${_id}`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.put(url, course, { headers })
      .map((res:any) => {
        return res;
      });
  }

  deleteCourse(_id:string){
    let url = `${API_URL}/course/${_id}`;

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

  getList(grade:string){
    let url = `${API_URL}/courses/simple?gradeyear=${grade}`;

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
