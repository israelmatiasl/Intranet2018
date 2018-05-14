import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PagesModule } from './pages/pages.module';

import { APP_ROUTES } from './app.routes';

import { ServiceModule } from "./services/service.module";

import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login.component';
import { PagenotfoundComponent } from './error/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    ServiceModule,
    APP_ROUTES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
