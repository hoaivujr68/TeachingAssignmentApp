import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturerManagementComponent } from './lecturer-management/lecturer-management.component';
import { ProfessionalManagementComponent } from './professional-management/professional-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lecturer-management', component: LecturerManagementComponent },
  { path: 'professional-management', component: ProfessionalManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
