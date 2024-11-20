import { cloneDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ProjectAsignmentComponent } from '../project-asignment/project-asignment.component';

@Component({
  selector: 'app-aspiration-not-assignment',
  templateUrl: './aspiration-not-assignment.component.html',
  styleUrls: ['./aspiration-not-assignment.component.scss']
})
export class AspirationNotAssignmentComponent extends ProjectAsignmentComponent {
  
  async fetchData() {
    this.isLoadingTable = true;
    const queryString = this.buildQueryString();
    await this.projectAssigmentService.getProjectNotAssignmentFilter(queryString)
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
