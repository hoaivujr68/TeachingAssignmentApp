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

@NgModule({
  declarations: [
    LecturerManagementComponent,
    DashboardComponent,
    AddDataComponent,
    ProfessionalGroupComponent,
    ProjectManagementComponent
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
