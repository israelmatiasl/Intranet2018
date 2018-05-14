import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Grade, Year, _Section } from '../../../models/seccion.model';
import { SeccionService, AlertService } from '../../../services/service.index';
declare function init_app();

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html'
})
export class SeccionesComponent implements OnInit {

  public existsGrades:boolean = true;
  public grades:Grade[];
  public gradeyears:Year[];
  public years:number[];
  public sections:_Section[];

  public page:number;
  public items_page:number;
  public total_sections:number;
  public total_pages:number;

  public grade:string;
  public type:string='';
  public gradeyear:string='';
  public year:number=new Date().getFullYear();
  public isFiltered:boolean;

  constructor(public _router:Router,
              private _sectionService:SeccionService,
              private _alertService:AlertService,
              private _route:ActivatedRoute) { }

  
  ngOnInit() {
    //init_app();
    this.checkIfExistsGrades();
    this.page=1;
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
            this._sectionService.getGrades()
              .subscribe((res) => {
                if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
                else { this.grades = res.grades; }
              });
          }
        }
      });
  }

  searchSections(grade:string){
    this.type = '';
    this.gradeyear = '';
    this.year = new Date().getFullYear();
    this.isFiltered = false;
    this.page = 1;
    this.getSections(grade, null, null, new Date().getFullYear(), this.page);
  }

  getSections(grade:string, gradeyear:string, type:string, year:number, page:number){
    this._sectionService.getSections(grade, gradeyear, type, year, page)
      .subscribe((res) => {
        if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
        else {
          this.grade = grade;
          this.sections = res.sections;
          this.items_page = res.items_page;
          this.total_pages = res.pages;
          this.total_sections = res.total;
          this.getGradeYears(grade);
          this.getSectionsYears();
        }
      });
  }

  getGradeYears(grade:string){
    this._sectionService.getYearGrades(grade)
      .subscribe((res) => {
        if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
        else { this.gradeyears = res.yeargrades; }
      });
  }

  getSectionsYears(){
    this._sectionService.getSectionsYears()
      .subscribe((res) => {
        this.years = res.years;
      });
  }

  changesFilters(type:string, gradeyear:string, year:number){
    if (type && type!='') { this.type = type }
    if (gradeyear && gradeyear!='') { this.gradeyear = gradeyear; }
    if (year) { this.year = year; }
    this.isFiltered = true;
    this.page = 1;
    this.getSections(this.grade, this.gradeyear, this.type, this.year, this.page);
  }

  navigation(number:boolean, value:number){
    let actual_page;
    if (number){ actual_page = value; }
    else { actual_page = this.page + value; }
    if (actual_page > this.total_pages || actual_page < 1) return;
    this.page = actual_page;
    if (this.isFiltered) {
      let gradeyear = null;
      let type = null;
      let year = new Date().getFullYear();
      if(this.type && this.type != '') type = this.type;
      if(this.gradeyear && this.gradeyear != '') gradeyear = this.gradeyear;
      if(this.year) year = this.year;

      this.getSections(this.grade, gradeyear, type, year, this.page);
    }
    else {
      this.getSections(this.grade, null, null, new Date().getFullYear(), this.page);
    }
  }

  deleteSection(_id:string){
    this._alertService.SweetAlertDelete('section', _id)
      .then((res) => {
        this._alertService.SweetAlertConfirmation(res.ok, res.code);
        if(res.ok) {
          if (this.isFiltered) {
            let gradeyear = null;
            let type = null;
            let year = new Date().getFullYear();
            if(this.type && this.type != '') type = this.type;
            if(this.gradeyear && this.gradeyear != '') gradeyear = this.gradeyear;
            if(this.year) year = this.year;
    
            //this.page = 1;
            this.getSections(this.grade, gradeyear, type, year, this.page);
          }
          else {
            //this.page = 1;
            this.getSections(this.grade, null, null, new Date().getFullYear(), this.page);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goAddSection(){
    this._router.navigate(['/admin/seccion/nuevo']);
  }
}
