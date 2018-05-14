import { Component, OnInit } from '@angular/core';
import { AlertService, SeccionService, CursoService } from '../../../services/service.index';
import { Room } from '../../../models/salon.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Course } from '../../../models/curso.model';
import { Grade, Year } from '../../../models/seccion.model';
import { Router } from '@angular/router';

declare function init_app();

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styles: []
})
export class CursosComponent implements OnInit {

  public isDisabled:boolean= true;
  public existsGrades:boolean = true;
  public showForm:boolean = false;

  public isEdit:boolean;
  public titleForm:string;
  public textSave:string;
  public isSaved:boolean=false;
  public course:Course;
  public gradeSelected:string = '';
  public gradeSelectedSearch:string = '';
  public grades:Grade[];
  public gradeyearsForm:Year[];
  public gradeyearsList:Year[];
  public coursesList:Course[];
  public loading:boolean;

  public courses:Course[];
  public categories:string[] = ['CIENCIAS', 'HUMANIDADES', 'LENGUAJE', 'ARTE', 'OTROS'];
  public page:number;
  public items_page:number;
  public total_courses:number;
  public total_pages:number;
  public gradeyearSelected:string;
  public categorySelected:string;

  constructor(public _router:Router,
              private _sectionService:SeccionService,
              private _cursoService:CursoService,
              private _alertService:AlertService) { }

  ngOnInit() {
    //init_app();
    this.checkIfExistsGrades();
  }

  checkIfExistsGrades(){
    this._sectionService.getYearGrades(null)
      .subscribe((res)=> {
        if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
        else {
          if(res.yeargrades < 1){
            this.existsGrades = false;
          }
          else {
            this.getGrades();
          }
        }
      });
  }

  getGrades(){
    this._sectionService.getGrades()
    .subscribe((res) => {
      if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
      else { this.grades = res.grades; }
    });
  }

  changeGrade(grade:string, isSearch:boolean){
    if(grade!='') {
      this.getGradeYears(grade, isSearch);
      if (!isSearch) this.coursesList = [];
    }
  }

  getGradeYears(grade:string, isSearch:boolean){
    this._sectionService.getYearGrades(grade)
        .subscribe((res) => {
          if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
          else {
            if (!isSearch) { this.gradeyearsForm = res.yeargrades; }
            else { this.gradeyearsList = res.yeargrades; }
          }
        });
  }

  changeGradeYearsForm(gradeyear:string){
    if(gradeyear && gradeyear!=''){
      this._cursoService.getList(gradeyear)
      .subscribe((res) => {
        if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
        else { this.coursesList = res.courses; }
      });
    }
  }

  getCourses(gradeyear, category, page){
    this._cursoService.getCourses(gradeyear, category, page)
      .subscribe((res) => {
        if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
        else {
          this.courses = res.courses;
          this.items_page = res.items_page;
          this.total_pages = res.pages;
          this.total_courses = res.total;
        }
      });
  }

  changesFilters(gradeyear:string, category:string){
    if (gradeyear && gradeyear!='') { this.gradeyearSelected = gradeyear; }
    if (category && category != '') { this.categorySelected = category; } else { this.categorySelected = null; }
    this.page = 1;
    this.getCourses(this.gradeyearSelected, this.categorySelected, this.page);
  }

  navigation(number:boolean, value:number){
    //number true: buttons 1,2,3.. - number false: next, back
    let actual_page;
    if (number){ actual_page = value; }
    else { actual_page = this.page + value; }
    if (actual_page > this.total_pages || actual_page < 1) return;
    this.page = actual_page;
    this.getCourses(this.gradeyearSelected, this.categorySelected, this.page);
  }

  openForm(course:Course = null){
    this.showForm = true;
    this.course = new Course('', '', '', '',);
    if(course){
      this.isEdit = true;
      this.textSave = 'Actualizar';
      this.titleForm = `Editar curso : ${course.code}`;
      this._cursoService.getCourse(course._id)
        .subscribe((res) => {
          if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
          else {
            this.course = res.course;
            this.changeGrade(this.course.grade, false);
          }
        });
    }
    else {
      if (this.coursesList && this.coursesList.length > 0) { this.coursesList = []; }
      this.isEdit = false;
      this.textSave = 'Guardar curso';
      this.titleForm = 'Nuevo curso';
    }
  }

  saveCourse(form:NgForm){
    if(form.invalid) return;
    this.loading = true;
    if (this.isEdit) {
      this._cursoService.updateCourse(this.course._id, this.course)
        .subscribe((res) => {
          setTimeout(() => {
            this._alertService.SweetAlertConfirmation(res.ok, res.code);
            if (res.ok) {
              this.isSaved = true;
              this.changeGradeYearsForm(res.courseUpdated.grade_year);
              if (res.courseUpdated.grade_year == this.gradeyearSelected){
                this.getCourses(this.gradeyearSelected, this.categorySelected, this.page);
              }
            }
            this.loading = false;
          }, 1500);
        });
    }
    else {
      this._cursoService.saveCourse(this.course)
        .subscribe((res) => {
          setTimeout(()=> {
            this._alertService.SweetAlertConfirmation(res.ok, res.code);
            if(res.ok) { 
              this.course = res.courseStored;
              this.isSaved = true;
              this.changeGradeYearsForm(res.courseStored.grade_year);
              if (res.courseStored.grade_year == this.gradeyearSelected){
                this.getCourses(this.gradeyearSelected, this.categorySelected, this.page);
              }
            }
            this.loading = false;
          }, 1500);
        });
    }
  }

  keepSave(){
    this.course = new Course('', '', '', '');
    this.isSaved = false;
    this.isEdit = false;
    this.coursesList = [];
    this.textSave = 'Guardar curso';
  }

  deleteCourse(course:Course){
    this._alertService.SweetAlertDelete('course', course._id)
      .then((res) => {
        this._alertService.SweetAlertConfirmation(res.ok, res.code);
        if (res.ok) {
          this.getCourses(this.gradeyearSelected, this.categorySelected, this.page);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
