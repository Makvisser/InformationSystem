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
import { ScheduleHeaderComponent } from './components/schedule-header/schedule-header.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { MomentPipe } from '../../shared/pipes/moment.pipe';
import { ScheduleBodyComponent } from './components/schedule-body/schedule-body.component';
import { ScheduleBodyCardComponent } from './components/schedule-body-card/schedule-body-card.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MatCardModule } from '@angular/material/card';
import { TaskDisplayComponent } from './components/task-display/task-display.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { ProfileComponent } from './components/profile/profile.component';
import { StartWorkDialogComponent } from './components/start-work-dialog/start-work-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectsComponent } from './components/projects/projects.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ProjectInfoComponent } from './components/project-info/project-info.component';

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    HeaderComponent,
    StartPageComponent,
    ScheduleHeaderComponent,
    MomentPipe,
    ScheduleBodyComponent,
    ScheduleBodyCardComponent,
    ScheduleComponent,
    TaskDisplayComponent,
    ProfileComponent,
    StartWorkDialogComponent,
  ],
  imports: [
    FontAwesomeTestingModule,
    CommonModule,
    RouterModule,
    MainRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    MatBadgeModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatStepperModule,
  ],
})
export class MainModule {
  constructor() {}
}
