import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_app();

@Component({
  selector: 'app-clases-add-edit',
  templateUrl: './clases-add-edit.component.html',
  styles: []
})
export class ClasesAddEditComponent implements OnInit {

  constructor(public _router:Router) { }

  ngOnInit() {
    init_app();
  }

  goListClassroom(){
    this._router.navigate(['/admin/clases']);
  }
}
