import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthService } from '../../shared/services/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.getValue() && this.router.navigateByUrl('main').then();
  }
}
