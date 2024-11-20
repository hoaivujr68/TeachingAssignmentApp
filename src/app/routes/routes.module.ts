import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutesRoutingModule } from './routes-routing.module';
import { LecturerManagementComponent } from './lecturer-management/lecturer-management.component';
import { NgZorroAntdModule } from '../shared/ng-zorro-ant/ng-zorro-antd.module';
import { ComponentsModule } from './components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ProfessionalGroupComponent } from './professional-group/professional-group.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { TeachingAssignmentComponent } from './teaching-assignment/teaching-assignment.component';
import { ClassManagementComponent } from './class-management/class-management.component';
import { ProjectAsignmentComponent } from './project-asignment/project-asignment.component';
import { TeachingNotAssignmentComponent } from './teaching-not-assignment/teaching-not-assignment.component';
import { AspirationNotAssignmentComponent } from './aspiration-not-assignment/aspiration-not-assignment.component';
import { AspirationManagementComponent } from './aspiration-management/aspiration-management.component';

@NgModule({
  declarations: [
    LecturerManagementComponent,
    DashboardComponent,
    AddDataComponent,
    ProfessionalGroupComponent,
    ProjectManagementComponent,
    TeachingAssignmentComponent,
    ClassManagementComponent,
    ProjectAsignmentComponent,
    TeachingNotAssignmentComponent,
    AspirationNotAssignmentComponent,
    AspirationManagementComponent
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    NgZorroAntdModule,
    ComponentsModule,
    FormsModule
  ]
})
export class RoutesModule { }
