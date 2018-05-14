import { Component, OnInit } from '@angular/core';
import { SalonService, AlertService } from '../../../services/service.index';
import { Room } from '../../../models/salon.model';
import { NgForm } from '@angular/forms';
import { Build } from '../../../helpers/constants'
import swal from 'sweetalert2';

declare function init_app();

@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html'
})
export class SalonesComponent implements OnInit {
  public showForm:boolean=false;
  public titleForm:string;
  public isEdit:boolean;
  public loading:boolean;
  public textSave:string;

  public room:Room;
  public rooms:Room[];

  public page:number;
  public items_page:number;
  public total_rooms:number;
  public total_pages:number;
  
  public searching:boolean;
  public filters:any = Build.buildFilterRoom();
  public filter:string = 'code';
  public search:string;

  constructor(private _salonService:SalonService, private _alertService:AlertService) {
    this.page = 1;
  }
  
  ngOnInit() {
    init_app();
    this.getRooms();
  }

  getRooms(){
    this.page = 1;
    this.searching = false;
    this.getRoomsPaginated(null, null, this.page);
  }

  getRoomsPaginated(filter, search, page:number){
    this._salonService.getRooms(filter, search, page)
      .subscribe((res)=> {
        if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
        else {
          this.rooms = res.rooms;
          this.items_page = res.items_page;
          this.total_pages = res.pages;
          this.total_rooms = res.total;
        }
      });
  }

  navigation(number:boolean, value:number){
    //number true: buttons 1,2,3.. - number false: next, back
    let actual_page;
    if (number){ actual_page = value; }
    else { actual_page = this.page + value; }
    if (actual_page > this.total_pages || actual_page < 1) return;
    this.page = actual_page;
    let filter = null;
    let search = null;
    if(this.searching){ filter = this.filter; search = this.search }
    this.getRoomsPaginated(filter, search, this.page);
  }

  searchRoom(){
    if (!this.search) return;
    this.page = 1;
    this.searching = true;
    this.getRoomsPaginated(this.filter, this.search, this.page);
  }

  openFormRoom(room:Room=null){
    this.showForm = true;
    this.room = new Room('', '');
    if (room){
      this.isEdit = true;
      this.textSave = 'Actualizar';
      this.titleForm = `Editar salón : ${room.code}`;
      this._salonService.getRoom(room._id)
        .subscribe((res)=>{
          if (!res.ok) { this._alertService.SweetAlertConfirmation(res.ok, res.code); }
          else { this.room = res.room; }
        });
    }
    else {
      this.isEdit = false;
      this.textSave = 'Guardar';
      this.titleForm = 'Nuevo salón';
    }
  }

  saveRoom(form:NgForm){
    if(form.invalid) return;
    this.loading = true;
    if(this.isEdit){
      this._salonService.updateRoom(this.room._id, this.room)
        .subscribe((res)=> {
          setTimeout(()=> {
            this._alertService.SweetAlertConfirmation(res.ok, res.code);
            if(res.ok) this.getRooms();
            this.loading = false;
          }, 1500);
        });
    }
    else {
      this._salonService.saveRoom(this.room)
      .subscribe((res:any)=> {
        
        setTimeout(()=> {
          this._alertService.SweetAlertConfirmation(res.ok, res.code);
          if(res.ok) this.getRooms();
          this.loading = false;
        }, 1500);
      });
    }
    
  }

  deleteRoom(room:Room){
    this._alertService.SweetAlertDelete('room', room._id)
      .then((res) => {
        this._alertService.SweetAlertConfirmation(res.ok, res.code);
        if(res.ok) this.getRooms();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
