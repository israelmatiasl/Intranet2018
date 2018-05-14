import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../pipes/pipe.module';

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './admin/noticias/noticias.component';
import { AlumnosComponent } from './admin/alumnos/alumnos.component';
import { AlumnosAddEditComponent } from './admin/alumnos/alumnos-add-edit.component';
import { DocentesComponent } from './admin/docentes/docentes.component';
import { DocentesAddEditComponent } from './admin/docentes/docentes-add-edit.component';
import { CursosComponent } from './admin/cursos/cursos.component';
import { SalonesComponent } from './admin/salones/salones.component';
import { SeccionesComponent } from './admin/secciones/secciones.component';
import { SeccionesAddEditComponent } from './admin/secciones/secciones-add-edit.component';

import { MisCursosComponent } from './general/mis-cursos/mis-cursos.component';
import { ClasesComponent } from './admin/clases/clases.component';
import { ClasesAddEditComponent } from './admin/clases/clases-add-edit.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    NoticiasComponent,
    AlumnosComponent,
    AlumnosAddEditComponent,
    DocentesComponent,
    DocentesAddEditComponent,
    CursosComponent,
    SalonesComponent,
    SeccionesComponent,
    SeccionesAddEditComponent,
    MisCursosComponent,
    ClasesComponent,
    ClasesAddEditComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    PAGES_ROUTES
  ],
  exports: []
})
export class PagesModule { }
