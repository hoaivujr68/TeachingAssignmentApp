import { cloneDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { ProjectAssigmentService } from 'src/app/service/project-assigment.service';

@Component({
  selector: 'app-project-asignment',
  templateUrl: './project-asignment.component.html',
  styleUrls: ['./project-asignment.component.scss']
})
export class ProjectAsignmentComponent extends LecturerManagementComponent {
  constructor(
    public lecturerServiceService: LecturerServiceService,
    public projectAssigmentService: ProjectAssigmentService
  ) {
    super(lecturerServiceService);
  }

  async fetchData() {
    this.isLoadingTable = true;
    const queryString = this.buildQueryString();
    await this.projectAssigmentService.getProjectAssignmentFilter(queryString)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listOfData = cloneDeep(res.content); 
          this.total = res.totalRecords;
        }
      })
      .finally(() => {
        this.isLoadingTable = false;
      });
  }

  async hanleClick(ev: any){
    this.isLoadingTable = true;
    await this.projectAssigmentService.projectAssignment()
    .toPromise()
    .then((res: any) => {
      if (res) {
        this.fetchData();
      }
    })
    .finally(() => {
      this.isLoadingTable = false;
    });
  }

  async handleReload(ev: any){
    await this.fetchData();
  }
}
