import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: StartPageComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'projects', component: ProjectsComponent },
      {
        path: 'messages',
        component: MessagesComponent,
        children: [{ path: ':id', component: ChatComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
