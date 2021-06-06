import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainRoutingModule } from './main-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, RouterModule, MainRoutingModule, MatSidenavModule, MatListModule, MatButtonModule],
})
export class MainModule {
  constructor() {
  }
}
