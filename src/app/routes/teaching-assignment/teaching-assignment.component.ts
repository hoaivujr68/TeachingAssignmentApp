import { Component, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { cloneDeep } from 'lodash';
import { TeachingAssigmentService } from 'src/app/service/teaching-assigment.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-teaching-assignment',
  templateUrl: './teaching-assignment.component.html',
  styleUrls: ['./teaching-assignment.component.scss']
})
export class TeachingAssignmentComponent extends LecturerManagementComponent {
  constructor(
    public lecturerServiceService: LecturerServiceService,
    public teachingAssigmentService: TeachingAssigmentService,
    private message: NzMessageService,
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

  async handleExportData() {
    this.isLoadingTable = true;
    try {
      // Gọi API và chờ đợi phản hồi blob
      const res: Blob = await this.teachingAssigmentService.exportTeachingAssignment().toPromise();
      
      // Tạo URL tạm thời cho file blob
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Thay đổi type nếu cần
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'TeachingAssignments.xlsx';  // Tên file muốn tải xuống
      link.click();  // Mô phỏng việc nhấp chuột vào link tải xuống
      
      // Thông báo thành công
      this.message.success("Xuất file phân công đồ án thành công");
    } catch (error) {
      // Xử lý lỗi
      this.message.error("Xuất file phân công đồ án thất bại!!!");
    } finally {
      this.isLoadingTable = false;
    }
  }
}

