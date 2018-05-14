import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService, AlertService } from '../services/service.index';
import { NgForm } from '@angular/forms';
import { Account } from '../models/usuario.model';

declare function init_app();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showingAlert:boolean = false;

  constructor(public _router:Router, 
              private _sesionService:SesionService,
              private _alertService:AlertService) { }

  ngOnInit() {
    init_app();
  }

  login(form:NgForm){
    if (form.invalid) { return; }
    let account = new Account(form.value.username, form.value.password);
    this._sesionService.login(account)
      .subscribe( (res)=> {
        if(res.ok){
          this._router.navigate(['/home'])
        }
        else{
          this._alertService.SweetAlertConfirmation(res.ok, res.code);
        }
      });
  }

}
