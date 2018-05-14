import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_app();

@Component({
  selector: 'app-alumnos-add-edit',
  templateUrl: './alumnos-add-edit.component.html',
  styles: []
})
export class AlumnosAddEditComponent implements OnInit {

  constructor(public _router:Router) { }

  ngOnInit() {
    init_app();
  }

  goListStudent(){
    this._router.navigate(['/admin/alumnos']);
  }
}
