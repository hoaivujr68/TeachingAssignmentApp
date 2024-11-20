import { Component, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { cloneDeep } from 'lodash';
import { TeachingAssigmentService } from 'src/app/service/teaching-assigment.service';

@Component({
  selector: 'app-teaching-assignment',
  templateUrl: './teaching-assignment.component.html',
  styleUrls: ['./teaching-assignment.component.scss']
})
export class TeachingAssignmentComponent extends LecturerManagementComponent {
  constructor(
    public lecturerServiceService: LecturerServiceService,
    public teachingAssigmentService: TeachingAssigmentService
  ) {
    super(lecturerServiceService);
  }

  async fetchData() {
    this.isLoadingTable = true;
    const queryString = this.buildQueryString();
    await this.teachingAssigmentService.getTeachingAssignmentFilter(queryString)
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
    await this.teachingAssigmentService.teachingAssignment()
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
}

