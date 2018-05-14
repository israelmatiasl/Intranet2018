import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from './pages.component';

import { HomeComponent } from './home/home.component';

//ADMINISTRADOR
import { NoticiasComponent } from "./admin/noticias/noticias.component";
import { AlumnosComponent } from './admin/alumnos/alumnos.component';
import { AlumnosAddEditComponent } from './admin/alumnos/alumnos-add-edit.component';
import { DocentesComponent } from './admin/docentes/docentes.component';
import { DocentesAddEditComponent } from './admin/docentes/docentes-add-edit.component';
import { CursosComponent } from './admin/cursos/cursos.component';
import { SalonesComponent } from './admin/salones/salones.component';
import { SeccionesComponent } from './admin/secciones/secciones.component';
import { SeccionesAddEditComponent } from './admin/secciones/secciones-add-edit.component';
import { ClasesComponent } from "./admin/clases/clases.component";
import { ClasesAddEditComponent } from "./admin/clases/clases-add-edit.component";
import { MisCursosComponent } from "./general/mis-cursos/mis-cursos.component";



const pagesRoutes : Routes = [
    {
        path: '',
        component: PagesComponent,
        children : [
            { path: 'home', component: HomeComponent, data: { title: 'Home'} },
            

            /* ==================== ADMINISTRADOR ====================*/
            //ALUMNOS
            { path: 'admin/alumnos', component: AlumnosComponent, data: { title: 'Alumnos'} },
            { path: 'admin/alumno/nuevo', component: AlumnosAddEditComponent, data: { title: 'Nuevo Alumno'} },
            { path: 'admin/alumno/editar/:id', component: AlumnosAddEditComponent, data: { title: 'Editar Alumno'} },
            //DOCENTES
            { path: 'admin/docentes', component: DocentesComponent, data: { title: 'Docentes'} },
            { path: 'admin/docente/nuevo', component: DocentesAddEditComponent, data: { title: 'Nuevo Docente'} },
            { path: 'admin/docente/editar/:id', component: DocentesAddEditComponent, data: { title: 'Editar Docente'} },
            //SECCIONES
            { path: 'admin/secciones', component: SeccionesComponent, data: { title: 'Secciones'} },
            { path: 'admin/seccion/nuevo', component: SeccionesAddEditComponent, data: { title: 'Nueva Sección'} },
            { path: 'admin/seccion/editar/:id', component: SeccionesAddEditComponent, data: { title: 'Editar Sección'} },
            //CLASES
            { path: 'admin/clases', component: ClasesComponent, data: { title: 'Clases'} },
            { path: 'admin/clase/nuevo', component: ClasesAddEditComponent, data: { title: 'Nueva Clase'} },
            { path: 'admin/clase/editar/:id', component: ClasesAddEditComponent, data: { title: 'Editar Clase'} },
            //SALONES
            { path: 'admin/salones', component: SalonesComponent, data: { title: 'Salones'} },
            //CURSOS
            { path: 'admin/cursos', component: CursosComponent, data: { title: 'Cursos'} },
            //NOTICIAS
            { path: 'admin/noticias', component: NoticiasComponent, data: { title: 'Noticias'} },
            /* ==================== ADMINISTRADOR ====================*/

            /* ==================== ALUMNOS ====================*/
            //CURSOS
            { path: 'mis-cursos', component: MisCursosComponent, data: { title: 'Mis Cursos' } },
            /* ==================== ALUMNOS ====================*/

            
            { path: '', pathMatch: 'full', redirectTo: 'home' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);