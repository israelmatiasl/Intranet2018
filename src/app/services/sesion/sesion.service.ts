import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

import { API_URL } from "../../helpers/constants";
import { Account, User } from '../../models/usuario.model';
import { School } from '../../models/school.model';

@Injectable()
export class SesionService {

  public school:School;
  public user:User;
  public role:string;
  public token:string;

  constructor(private _http:HttpClient,
              private _router:Router) { }

  login(account:Account, remember:boolean=false){
    let url = `${API_URL}/account/login`;

    return this._http.post(url, account)
      .map((res:any) => {
        if(res.ok){
          this.saveStorage(res.school, res.user, res.user.role, res.token);
        }
        return res;
      });
  }

  logout(){
    this.school = null;
    this.user = null;
    this.role = null;
    this.token = null;
    localStorage.removeItem('school');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');

    this._router.navigate(['/login']);
  }

  saveStorage(school:School, user:User, role:string, token:string){
    localStorage.setItem('school', JSON.stringify(school));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
    this.user = user;
    this.role = role;
    this.token = token;
  }

  getSchoolFLS(){
    if (localStorage.getItem('school')) {this.school = JSON.parse(localStorage.getItem('school'));}
    else { this.school = null; }
    return this.school;
  }

  getUserFLS(){
    if (localStorage.getItem('user')) {this.user = JSON.parse(localStorage.getItem('user'));}
    else { this.user = null; }
    return this.user;
  }

  getRoleFLS(){
    if(localStorage.getItem('role')){ this.role = localStorage.getItem('role');}
    else{ this.role = null; }
    return this.role;
  }

  getTokenFLS(){
    if (localStorage.getItem('token')) { this.token = localStorage.getItem('token'); }
    else { this.token = null; }
    return this.token;
  }

}
