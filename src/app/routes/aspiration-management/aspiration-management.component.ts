import { cloneDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { AspirationService } from 'src/app/service/aspiration.service';

@Component({
  selector: 'app-aspiration-management',
  templateUrl: './aspiration-management.component.html',
  styleUrls: ['./aspiration-management.component.scss']
})
export class AspirationManagementComponent extends LecturerManagementComponent {
  constructor(
    public lecturerServiceService: LecturerServiceService,
    public aspirationService: AspirationService
  ) {
    super(lecturerServiceService);
  }

  ngAfterViewInit() {
    this.calculateHeightBodyTable();
    this.tableBodyElement = document.getElementsByTagName('nz-table-inner-scroll')[0];
    if (this.tableBodyElement) {
      (this.tableBodyElement as HTMLElement).style.minHeight = 'calc(100vh - 250px)';
    }
  }

  calculateHeightBodyTable() {
    this.scrollY = `calc(100vh - 250px)`;
  }

  async fetchData() {
    this.isLoadingTable = true;
    const queryString = this.buildQueryString();
    await this.aspirationService.getAspirationFilter(queryString)
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
