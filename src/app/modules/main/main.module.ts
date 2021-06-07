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
import { StartPageComponent } from './components/start-page/start-page.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    HeaderComponent,
    StartPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
  ],
})
export class MainModule {
  constructor() {}
}
