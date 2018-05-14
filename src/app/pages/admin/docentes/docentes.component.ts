import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Build } from '../../../helpers/constants'
import { DocenteService, AlertService } from '../../../services/service.index';
import { Teacher } from '../../../models/usuario.model';

declare function init_app();

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html'
})
export class DocentesComponent implements OnInit {

  public isFounded:boolean = false;
  public isSearched:boolean = false;

  public filter:string='username';
  public word:string;
  public filterSelect:any[] = Build.buildSearchUser();
  public status:string = 'ACTIVE';
  public psurname:string;
  public allStatus:any[] = Build.buildStatusUser();
  public teacher:Teacher;
  public teachers:Teacher[];
  public page:number;
  public items_page:number;
  public total_teachers:number;
  public total_pages:number;

  constructor(public _router:Router,
              private _alertService:AlertService,
              private _teacherService:DocenteService) {

  }

  ngOnInit() {
    //init_app();
    this.showAll();
  }

  showAll(){
    this.page = 1;
    this.isSearched = false;
    this.status = 'ACTIVE';
    this.getTeachers(null, this.status, this.page);
  }

  getTeachers(psurname:string, status:string, page:number){
    this._teacherService.getTeachers(psurname, status, page)
        .subscribe((res) => {
          if (!res.ok) this._alertService.SweetAlertConfirmation(res.ok, res.code);
          else {
            this.teachers = res.teachers;
            this.items_page = res.items_page;
            this.total_pages = res.pages;
            this.total_teachers = res.total;
          }
      });
  }

  changeStatus(status:string){
    this.status = status;
    let psurname = null;
    if (this.psurname && this.psurname!='') {
      psurname = this.psurname;
    }
    this.page = 1;
    this.getTeachers(psurname, this.status, this.page);
  }

  navigation(number:boolean, value:number){
    let actual_page;
    if (number){ actual_page = value; }
    else { actual_page = this.page + value; }
    if (actual_page > this.total_pages || actual_page < 1) return;
    this.page = actual_page;
    let psurname = null;
    if (this.isSearched) { psurname = this.psurname; }
    this.getTeachers(psurname, this.status, this.page);
  }

  searchTeacher(form:NgForm){
    if(form.invalid) return;
    if (this.filter == 'psurname') {
      this.page = 1;
      this.psurname = this.word;
      this.getTeachers(this.psurname, null, this.page);
      this.isSearched = true;
    }
    else if (this.filter == 'username' || this.filter == 'document') {
      this.showDetail(this.filter, this.word);
    }
  }

  showDetail(filter:string, word:string){
    let searchby = 'username';
    if (filter) searchby = filter;
    this._teacherService.getOneTeacher(searchby, word)
        .subscribe((res) => {
          if (!res.ok) this._alertService.SweetAlertConfirmation(res.ok, res.code);
          else {
            this.teacher = res.teacher;
            this.isFounded = true;
          }
        });
  }

  closeDetail(){
    this.isFounded = false;
    this.teacher = null;
  }

  goAddTeacher(){
    this._router.navigate(['/admin/docente/nuevo']);
  }

}
