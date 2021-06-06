import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainRoutingModule } from './main-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [MainComponent, SidebarComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
  ],
})
export class MainModule {
  constructor() {}
}
