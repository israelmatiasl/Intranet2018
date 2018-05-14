import { Component, OnInit } from '@angular/core';
declare function init_app();

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styles: []
})
export class NoticiasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_app();
    jQuery('#dp1, #dp2').datepicker({autoclose: true,format: 'dd MM yyyy'});
    // $('.clockpicker').clockpicker({ donetext: 'Done'});
  }

}
