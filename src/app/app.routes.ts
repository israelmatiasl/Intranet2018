import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login.component';
import { PagenotfoundComponent } from './error/pagenotfound.component';

const appRoutes : Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', component: PagenotfoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true});