import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_app();

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: []
})
export class AlumnosComponent implements OnInit {

  public filterSelect:any[];
  public gradeSelect:any[];
  public yearSelect:any[];
  public sectionSelect:any[];

  public filter:string='code';
  public grade:string;
  public year:string;
  public section:string;

  constructor(public _router:Router) { }

  ngOnInit() {
    init_app();
    this.filterSelect = [{ id: 'lastname', text: 'Apellido' },
                         { id: 'code', text: 'Código' },
                         { id: 'document', text: 'Documento' },
                         { id: 'grade', text: 'Grado' }]
    this.gradeSelect = [{ id: 'garden', text: 'Inicial' },
                        { id: 'primary', text: 'Primaria' },
                        { id: 'hight', text: 'Secundaria' }];
    this.yearSelect = [{ id: '4year', text: '4 años' },
                       { id: '5year', text: '5 años' }];
    this.sectionSelect = [{}];                   
  }

  goAddStudent(){
    this._router.navigate(['/admin/alumno/nuevo']);
  }

  searchStudent(f:NgForm){

  }

}
