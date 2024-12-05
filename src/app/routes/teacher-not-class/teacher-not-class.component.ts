import { cloneDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { TeachingAssignmentComponent } from '../teaching-assignment/teaching-assignment.component';

@Component({
  selector: 'app-teacher-not-class',
  templateUrl: './teacher-not-class.component.html',
  styleUrls: ['./teacher-not-class.component.scss']
})
export class TeacherNotClassComponent extends TeachingAssignmentComponent {
  async fetchData() {
    this.isLoadingTable = true;
    const queryString = this.buildQueryString();
    await this.teachingAssigmentService.getTeacherNotAssignmentFilter(queryString)
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
