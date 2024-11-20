import { cloneDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { TeachingAssignmentComponent } from '../teaching-assignment/teaching-assignment.component';

@Component({
  selector: 'app-teaching-not-assignment',
  templateUrl: './teaching-not-assignment.component.html',
  styleUrls: ['./teaching-not-assignment.component.scss']
})
export class TeachingNotAssignmentComponent extends TeachingAssignmentComponent {
  async fetchData() {
    this.isLoadingTable = true;
    const queryString = this.buildQueryString();
    await this.teachingAssigmentService.getTeachingNotAssignmentFilter(queryString)
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
