import {RoutesModule} from './routes/routes.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './routes/main-layout/main-layout.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { BlankLayoutComponent } from './routes/blank-layout/blank-layout.component';
import { UserLoginComponent } from './routes/user-login/user-login.component';
import { UserRegisterComponent } from './routes/user-register/user-register.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
       // Lazy load RoutesModule
       { path: 'lecturer', loadChildren: () => import('./../app/routes/routes.module').then(m => m.RoutesModule) }
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: 'login', component: UserLoginComponent },
      { path: 'register', component: UserRegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
