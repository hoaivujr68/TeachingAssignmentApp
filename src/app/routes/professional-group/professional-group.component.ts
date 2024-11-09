import { cloneDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { ProfessionalGroupService } from 'src/app/service/professional-group.service';

@Component({
  selector: 'app-professional-group',
  templateUrl: './professional-group.component.html',
  styleUrls: ['./professional-group.component.scss']
})
export class ProfessionalGroupComponent extends LecturerManagementComponent {
  constructor(
    public lecturerServiceService: LecturerServiceService,
    public professionalGroupService: ProfessionalGroupService
  ) {
    super(lecturerServiceService);
  }

  async fetchData() {
    const queryString = this.buildQueryString();
    await this.professionalGroupService.getProfessionalGroup(this.request.page, this.request.size, queryString)
      .toPromise()
      .then((res: any) => {
        if (res) {
          let resValue = cloneDeep(res.content);
          resValue = resValue.map((item: any) => {
            const uniqueCourses = item.listCourse.filter(
              (course: any, index: any, self: any) =>
                index === self.findIndex((t: any) => t.name === course.name)
            );
            return {
              ...item,
              listCourse: uniqueCourses
            };
          });
  
          this.listOfData = cloneDeep(resValue);
          this.total = res.totalRecords;
        }
      })
      .finally(() => {
      });
  }
}
