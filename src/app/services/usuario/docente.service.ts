import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';

import { API_URL } from "../../helpers/constants";
import { SesionService } from '../sesion/sesion.service';
import { Teacher } from '../../models/usuario.model';

@Injectable()
export class DocenteService {

  constructor(private _http:HttpClient,
              private _sesion:SesionService) { }

  getTeachers(psurname:string, status:string, page:number=1){
    let queries = `page=${page}`
    if (status) queries = `status=${status}&${queries}`;
    if (psurname) queries = `psurname=${psurname}&${queries}`;
    let url = `${API_URL}/teachers?${queries}`;
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

  getOneTeacher(type:string, word:string){
    let url = `${API_URL}/teacher/${type}/${word}`;
    
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

  getTeacherById(_id:string){
    let url = `${API_URL}/teacher/${_id}`;
    
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

  saveTeacher(teacher:Teacher){
    let url = `${API_URL}/teacher`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.post(url, teacher, { headers })
      .map((res:any) => {
        return res;
      });
  }

  updateTeacher(_id:string, teacher:Teacher){
    let url = `${API_URL}/teacher/${_id}`;

    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.put(url, teacher, { headers })
      .map((res:any) => {
        return res;
      });
  }

  updateStatus(_id:string, status:string){
    let action;
    if (status == 'ACTIVE') { action = 'disable'; }
    else if (status == 'INACTIVE') { action = 'enable'; }
    let url = `${API_URL}/teacher/${_id}/status/${action}`;
    let params = JSON.stringify({});
    let token = this._sesion.getTokenFLS();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Auth': token
    });

    return this._http.put(url, params, { headers })
      .map((res:any) => {
        return res;
      });
  }

  deleteTeacher(_id:string){
    let url = `${API_URL}/teacher/${_id}`;
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
    let url = `${API_URL}/teachers/simple`;

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
