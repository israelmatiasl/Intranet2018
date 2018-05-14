import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeccionService, CursoService, AlertService, DocenteService } from '../../../services/service.index';
import { Grade, Year } from '../../../models/seccion.model';
import { Course } from '../../../models/curso.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Teacher } from '../../../models/usuario.model';
import { Build } from '../../../helpers/constants';

//declare var jQuery:any;
declare var $:any;
declare function init_app();

@Component({
  selector: 'app-docentes-add-edit',
  templateUrl: './docentes-add-edit.component.html'
})
export class DocentesAddEditComponent implements OnInit {

  public formClass:string;

  public isEdit:boolean;
  public loading:boolean;
  public isSaved:boolean;
  public titleForm:string;
  public textSave:string;
  public textUpdateImage:string='';
  public teacher:Teacher;
  public genders:string[] = ['M', 'F'];
  public studiesgrade:string[] = Build.buildStudieGrades();
  public form:FormGroup;

  public coursesForm:boolean = false;
  public grades:Grade[];
  public gradeyears:Array<Year[]>;
  public courses:Array<Course[]>;
  public gradesSelected:string[];
  public gradesyearsSelected:string[];
  public coursesSelected:string[];
  public totalcourses:number = 1;

  public isReadyToAction:boolean = false;

  constructor(public _router:Router,
              private _route:ActivatedRoute,
              private _teacherService:DocenteService,
              private _sectionService:SeccionService,
              private _courseService:CursoService,
              private _alertService:AlertService) {
    
    this.teacher = new Teacher('', '', '', '', '', '', '', null, '', '', new Date(), '', '');
  }

  ngOnInit() {
    //init_app();
    //this.initializeFormCourses();
    //jQuery('#birthday, #hire_date').datepicker({autoclose: true, format: "yyyy-mm-dd"});
    this.isEditOrNew();
  }

  isEditOrNew(){
    this._route.params.subscribe(params => {
      if (params['id']) {
        let _id = params['id'];
        this._teacherService.getTeacherById(_id)
          .subscribe((res) => {
            if (!res.ok) { 
              this._alertService.SweetAlertConfirmation(res.ok, res.code);
              this._router.navigate(['/admin/docente/nuevo']);
            }
            else if (res.teacher.status == 'DELETED'){
              this._alertService.SweetAlertConfirmation(false, 'err_056');
              this._router.navigate(['/admin/docentes']);
            }
            else {
              this.teacher = res.teacher;
              this.formClass = 'col-md-9';
              this.isEdit = true;
              this.titleForm = `Editar docente : ${this.teacher.username}`;
              this.textSave = 'Actualizar';
              if (this.teacher.image) { this.textUpdateImage = 'Actualizar foto'; }
              else { this.textUpdateImage = 'Subir foto'; }
              this.initializeFormCourses(this.teacher._id);
            }
          });
      }
      else {
        this.formClass = 'col-md-12';
        this.isEdit = false;
        this.titleForm = 'Nuevo docente';
        this.textSave = 'Guardar';
      }
    });
  }

  saveTeacher(form:NgForm){
    if(form.invalid) return;
    this.loading = true;
    if (this.isEdit) {
      this._teacherService.updateTeacher(this.teacher._id, this.teacher)
        .subscribe((res) => {
          setTimeout(() => {
            this._alertService.SweetAlertConfirmation(res.ok, res.code);
            if(res.ok) { this.isSaved = true; }
            this.loading = false;
          }, 1500);
        });
    }
    else {
      let teacher = new Teacher(form.value.name, form.value.psurname, form.value.msurname, form.value.document,
                                form.value.grade, form.value.career, form.value.gender, new Date(form.value.birthday),
                                form.value.address, form.value.email, new Date(form.value.hire_date), form.value.phone,
                                form.value.cell_phone);
      this._teacherService.saveTeacher(teacher)
        .subscribe((res)=> {
          setTimeout(() => {
            this._alertService.SweetAlertConfirmation(res.ok, res.code);
            if (res.ok) {
              this.formClass = 'col-md-9';
              this.teacher = res.teacherStored;
              this.isSaved = true;
              this.titleForm = `Docente : ${this.teacher.username}`;
              this.textUpdateImage = 'Subir foto';
              this.initializeFormCourses(null);
              $("html, body").animate({ scrollTop: $('body').prop("scrollHeight")}, 500);
            }
            this.loading = false;
          }, 1500);
        });
    }
  }

  initializeFormCourses(techer_id:string){
    this.coursesForm = true;
    this.getGrades();
    this.gradesSelected = new Array();
    this.gradesSelected[0] = '';
    this.gradesyearsSelected = new Array();
    this.gradesyearsSelected[0] = '';
    this.coursesSelected = new Array();
    this.coursesSelected[0] = '';
    this.gradeyears = new Array();
    this.courses = new Array();
  }

  endFormCourses(){
    this.coursesForm = false;
    this.gradeyears = [];
    this.courses = [];
    this.gradesSelected = [];
    this.gradesyearsSelected = [];
    this.coursesSelected = [];
    this.totalcourses = 1;
  }

  getGrades(){
    this._sectionService.getGrades()
      .subscribe((res) => {
        if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
        else { this.grades = res.grades; }
      });
  }

  getGradeYears(grade:string, pos:number){
    this._sectionService.getYearGrades(grade)
      .subscribe((res) => {
        if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
        else {
          this.gradeyears[pos]=[];
          this.gradeyears[pos] = res.yeargrades;
        }
      });
  }

  getCourses(gradeyear:string, pos:number){
    this._courseService.getList(gradeyear)
      .subscribe((res) => {
        if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
        else { 
          this.courses[pos]=[];
          this.courses[pos] = res.courses;
        }
      });
  }

  goListTeacher(){
    this._router.navigate(['/admin/docentes']);
  }

  goAddTeacher(){
    
    if(this.isEdit){
      this._router.navigate(['/admin/docente/nuevo']);
    }
    else {
      this.teacher = new Teacher('', '', '', '', '', '', '', null, '', '', new Date(), '', '');
      this.titleForm = 'Nuevo docente';
      this.isSaved = false;
    }
    this.endFormCourses();
  }

  addCourse(){
    this.totalcourses ++;
    this.gradesSelected.push('');
    this.gradesyearsSelected.push('');
    this.coursesSelected.push('');
  }

  removeCourse(){
    this.totalcourses --;
    this.gradesSelected.splice(-1, 1);
    this.gradesyearsSelected.splice(-1, 1);
    this.coursesSelected.splice(-1, 1);
  }

  saveCourses(form:NgForm){
    console.log(form.value);
    console.log(this.coursesSelected);
  }

  updateStatus(){
    this._teacherService.updateStatus(this.teacher._id, this.teacher.status)
      .subscribe((res) => {
        this._alertService.SweetAlertConfirmation(res.ok, res.code);
        this.isReadyToAction = false;
        if (res.ok){ this.teacher.status = res.status; }
      });
  }

  deleteTeacher(){
    this._alertService.SweetAlertDelete('teacher', this.teacher._id)
      .then((res)=> {
        this._alertService.SweetAlertConfirmation(res.ok, res.code);
        if (res.ok) { this.teacher.status = res.teacherDeleted.status; }
      }).catch((err) => {
        console.log(err);
      });
  }
}
