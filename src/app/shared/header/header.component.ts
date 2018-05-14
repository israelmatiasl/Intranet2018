import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../services/service.index';
import { User } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  
  user:User;
  constructor(public _router:Router, private _sesionService:SesionService) { }

  ngOnInit() {
    this.user = this._sesionService.getUserFLS();
  }

  logout(){
    this._sesionService.logout();
  }

}
