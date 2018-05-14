import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { SesionService,
         SalonService,
         AlertService,
         SeccionService,
         CursoService,
         DocenteService
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SesionService,
    SalonService,
    AlertService,
    SeccionService,
    CursoService,
    DocenteService
  ]
})
export class ServiceModule { }
