import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutesRoutingModule } from './routes-routing.module';
import { LecturerManagementComponent } from './lecturer-management/lecturer-management.component';
import { NgZorroAntdModule } from '../shared/ng-zorro-ant/ng-zorro-antd.module';
import { ComponentsModule } from './components/components.module';
import { ProfessionalManagementComponent } from './professional-management/professional-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    LecturerManagementComponent,
    ProfessionalManagementComponent,
    DashboardComponent
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
