import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_app();

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styles: []
})
export class ClasesComponent implements OnInit {

  public filterSelect:any[];
  public gradeSelect:any[];
  public yearSelect:any[];
  public sectionSelect:any[];

  public filter:string='grade';
  public grade:string;
  public year:string;
  public section:string;

  constructor(public _router:Router) { }

  ngOnInit() {
    init_app();
    this.filterSelect = [{ id: 'grade', text: 'Grado' },
                         { id: 'code', text: 'Código' }]
    this.gradeSelect = [{ id: 'garden', text: 'Inicial' },
                        { id: 'primary', text: 'Primaria' },
                        { id: 'hight', text: 'Secundaria' } ];
    this.yearSelect = [{ id: '4year', text: '4 años' },
                       { id: '5year', text: '5 años' }];
    this.sectionSelect = [{}];      
  }

  goAddClassroom(f:NgForm){
    this._router.navigate(['/admin/clase/nuevo']);
  }

  searchClassroom(){

  }
}
