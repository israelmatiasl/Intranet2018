import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Success, Errors } from "../../helpers/responses";
import { SalonService } from '../salon/salon.service';
import { SeccionService } from '../seccion/seccion.service';
import { CursoService } from '../cursos/curso.service';
import { DocenteService } from '../usuario/docente.service';

@Injectable()
export class AlertService {


  constructor(private _salonService:SalonService,
              private _seccionService:SeccionService,
              private _cursoService:CursoService,
              private _teacherService:DocenteService) { }

  SweetAlertDelete(model:string, _id:string): Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      swal({
        title: 'Está seguro de eliminar?',
        text: "Luego de eliminar no habrá marcha atrás",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          switch (model) {
            case 'room': {
                this._salonService.deleteRoom(_id).subscribe(res => resolve(res));
            } break;

            case 'section': {
                this._seccionService.deleteSection(_id).subscribe(res => resolve(res));
            } break;

            case 'course' : {
                this._cursoService.deleteCourse(_id).subscribe(res => resolve(res));
            } break;

            case 'teacher' : {
              this._teacherService.deleteTeacher(_id).subscribe(res => resolve(res));
            } break;
          
            default:{
                reject('No coincide el objeto que desea eliminar');
            } break;
          }
        }
      });
    });
  }

  SweetAlertConfirmation(ok:boolean, code:string){
      let type;
      let title;
      let message;
      if(ok) { type = 'success'; title = 'Hecho!'; message = Success.getMessage(code); }
      else { type = 'warning'; title = 'Ops!'; message = Errors.getMessage(code); }
      swal({ type: type, title: title, text: message ,showConfirmButton: false, timer: 2000 }); 
  }


  sessionExpired(){
    swal({
      title: 'Su sesión ha expirado',
      text: "Vuelva a inicar sesión para poder continuar",
      type: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        //this._accountService.logout();
      }
    })
  }
  
}
