import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturerManagementComponent } from './lecturer-management/lecturer-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ProfessionalGroupComponent } from './professional-group/professional-group.component';
import { ProjectManagementComponent } from './project-management/project-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lecturer-management', component: LecturerManagementComponent },
  { path: 'project-management', component: ProjectManagementComponent },
  { path: 'professional-group-management', component: ProfessionalGroupComponent },
  { path: 'import-data', component: AddDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
