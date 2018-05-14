import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public _router:Router) { }

  ngOnInit() {
  }

  goHome(){
    this._router.navigate(['/home']);
  }

  goStudents(){
    this._router.navigate(['/admin/alumnos']);
  }

  goTeachers(){
    this._router.navigate(['/admin/docentes']);
  }
  
  goClass(){
    this._router.navigate(['/admin/clases']);
  }

  goSections(){
    this._router.navigate(['/admin/secciones']);
  }

  goRooms(){
    this._router.navigate(['/admin/salones']);
  }

  goCourses(){
    this._router.navigate(['/admin/cursos']);
  }

  goNews(){
    this._router.navigate(['/admin/noticias']);
  }

}
