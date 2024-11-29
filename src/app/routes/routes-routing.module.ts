import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturerManagementComponent } from './lecturer-management/lecturer-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ProfessionalGroupComponent } from './professional-group/professional-group.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ClassManagementComponent } from './class-management/class-management.component';
import { TeachingAssignmentComponent } from './teaching-assignment/teaching-assignment.component';
import { ProjectAsignmentComponent } from './project-asignment/project-asignment.component';
import { TeachingNotAssignmentComponent } from './teaching-not-assignment/teaching-not-assignment.component';
import { AspirationNotAssignmentComponent } from './aspiration-not-assignment/aspiration-not-assignment.component';
import { AspirationManagementComponent } from './aspiration-management/aspiration-management.component';

const routes: Routes = [
  { path: 'lecturer-management', component: LecturerManagementComponent },
  { path: 'project-management', component: ProjectManagementComponent },
  { path: 'professional-group-management', component: ProfessionalGroupComponent },
  { path: 'class-management', component: ClassManagementComponent },
  { path: 'import-data', component: AddDataComponent },
  { path: 'teaching-assignment', component: TeachingAssignmentComponent },
  { path: 'project-assignment', component: ProjectAsignmentComponent },
  { path: 'teaching-not-assignment', component: TeachingNotAssignmentComponent },
  { path: 'project-not-assignment', component: AspirationNotAssignmentComponent },
  { path: 'aspiration-management', component: AspirationManagementComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
