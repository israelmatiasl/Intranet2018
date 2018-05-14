import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavRightComponent } from './nav-right/nav-right.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    NavLeftComponent,
    NavRightComponent
  ],

  imports: [
    RouterModule,
    CommonModule
  ],

  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    NavLeftComponent,
    NavRightComponent
  ]
})
export class SharedModule { }
