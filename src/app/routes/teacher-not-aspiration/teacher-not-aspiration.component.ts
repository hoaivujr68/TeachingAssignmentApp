import { cloneDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ProjectAsignmentComponent } from '../project-asignment/project-asignment.component';

@Component({
  selector: 'app-teacher-not-aspiration',
  templateUrl: './teacher-not-aspiration.component.html',
  styleUrls: ['./teacher-not-aspiration.component.scss']
})
export class TeacherNotAspirationComponent extends ProjectAsignmentComponent {
  
  async fetchData() {
    this.isLoadingTable = true;
    const queryString = this.buildQueryString();
    await this.projectAssigmentService.getTeacherNotAssignmentFilter(queryString)
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
}
