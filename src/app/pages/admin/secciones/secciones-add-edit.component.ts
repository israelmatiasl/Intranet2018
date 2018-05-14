import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Grade, Year, Section } from '../../../models/seccion.model';
import { SeccionService, AlertService } from '../../../services/service.index';
import { NgForm } from '@angular/forms';
declare function init_app();

@Component({
  selector: 'app-secciones-add-edit',
  templateUrl: './secciones-add-edit.component.html'
})
export class SeccionesAddEditComponent implements OnInit {

  public existsGrades:boolean = true;
  public isEdit:boolean;
  public titleForm:string;
  public textSave:string;
  public loading:boolean;
  public isSaved:boolean=false;

  public sections:Section[];
  public showSectionsList:boolean=false;

  public showFormGrade:boolean = false;
  public showFormGradeYear:boolean = false;
  public grade:Grade;
  public gradeYear:Year;
  public grades:Grade[];
  public years:Year[];

  public section:Section;
  public sectionSelected:string;

  constructor(public _router:Router,
              private _sectionService:SeccionService,
              private _alertService:AlertService,
              private _route:ActivatedRoute) {

    this.section = new Section('REGULAR', '', '', '', null, 0, null);
   }

  ngOnInit() {
    //init_app();
    this.checkIfExistsGrades();
    //this.isEditOrNew();
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
            this.isEditOrNew();
          }
        }
      });
  }

  isEditOrNew(){
    this._route.params.subscribe(params => {
      if (params['id']) {
        let _id = params['id'];
        this._sectionService.getSection(_id)
          .subscribe((res) => {
            if (!res.ok) { 
              this._alertService.SweetAlertConfirmation(res.ok, res.code);
              this._router.navigate(['/admin/seccion/nuevo']);
            }
            else {
              this.section = res.section;
              this.isEdit = true;
              this.titleForm = `Editar sección : ${this.section.code}`;
              this.textSave = 'Actualizar';
              if (!this.grades) this.getGrades();
              this.getGradeYears(this.section.grade);
            }
          });
      }
      else {
        this.isEdit = false;
        this.titleForm = 'Nueva sección';
        this.textSave = 'Guardar';
        if (!this.grades) this.getGrades();
      }
    });
  }

  goListSection(){
    this._router.navigate(['/admin/secciones']);
  }

  goAddSection(){
    if(this.isEdit){
      this._router.navigate(['/admin/seccion/nuevo']);
    }
    else {
      this.section = new Section('REGULAR', '', '', '', null, 0, null);
      this.titleForm = 'Nueva sección';
      this.isSaved = false;
    }
  }

  openFormGrade(){
    this.showFormGrade = true;
    this.grade = new Grade('');
    if(!this.grades) this.getGrades();
  }

  openFormGradeYear(){
    this.showFormGradeYear = true;
    this.gradeYear = new Year('', '');
    if(!this.grades) this.getGrades();
  }

  changeGrade(grade:string){
    if(grade!='') this.getGradeYears(grade);
  }

  changeGradeYears(gradeyear:string){
    if(gradeyear != '' && this.section.grade != '' && this.section.year && this.section.type != ''){
      this._sectionService.getSections(this.section.grade, this.section.grade_year, this.section.type, this.section.year)
        .subscribe((res) => {
          if(!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
          else { this.sections = res.sections; this.showSectionsList = true; }
        });
    }
  }

  getGrades(){
    this._sectionService.getGrades()
    .subscribe((res) => {
      if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
      else { this.grades = res.grades; }
    });
  }

  getGradeYears(grade:string){
    this._sectionService.getYearGrades(grade)
      .subscribe((res) => {
        if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
        else { this.years = res.yeargrades; }
      });
  }

  saveGrade(form:NgForm){
    if(form.invalid) return;
    this._sectionService.saveGrade(this.grade)
      .subscribe((res) => {
        this._alertService.SweetAlertConfirmation(res.ok, res.code);
        if(res.ok){
          this.getGrades();
          this.grade = new Grade('');
        }
      });
  }

  saveGradeYear(form:NgForm){
    if(form.invalid) return;
    this._sectionService.saveYearGrade(this.gradeYear)
      .subscribe((res) => {
        this._alertService.SweetAlertConfirmation(res.ok, res.code);
        if(res.ok) {
          this.getGradeYears(this.gradeYear.grade);
          this.gradeYear = new Year(this.gradeYear.grade, '');
        }
        if(!this.existsGrades) this.existsGrades = true;
      });
  }

  saveSection(form:NgForm){
    if(form.invalid) return;
    this.loading = true;
    if (this.isEdit) {
      this._sectionService.updateSection(this.section._id, this.section)
        .subscribe((res) => {
          setTimeout(() => {
            this._alertService.SweetAlertConfirmation(res.ok, res.code);
            if(res.ok) { this.isSaved = true; }
            this.loading = false;
          }, 1500);
        });
    }
    else {
      this._sectionService.saveSection(this.section)
        .subscribe((res)=> {
          setTimeout(()=> {
            this._alertService.SweetAlertConfirmation(res.ok, res.code);
            if(res.ok) {
              this.section = res.sectionStored;
              this.titleForm = `Sección : ${this.section.code}`;
              this.isSaved = true;
            }
            this.loading = false;
            this.showSectionsList = false;
          }, 1500);
          
        });
    }
  }
}
