import { cloneDeep } from 'lodash';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { ProjectAssigmentService } from 'src/app/service/project-assigment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-criteria',
  templateUrl: './list-criteria.component.html',
  styleUrls: ['./list-criteria.component.scss']
})
export class ListCriteriaComponent extends LecturerManagementComponent {
  total = 0;
  pageSize = 20;  // Số lượng bản ghi mỗi trang
  currentPage = 1;  // Trang hiện tại
  paginatedData: any[] = []; 

  criteriaList: any[] = [
    {
      value: 'RB1',
      label: 'Một lớp - Một giáo viên'
    },
    {
      value: 'RB2',
      label: 'Một thời điểm - Một lớp'
    },
    {
      value: 'RB3',
      label: 'Đúng chuyên môn'
    },
    {
      value: 'RB4',
      label: 'Một đồ án - Một giảng viên'
    },
    {
      value: 'RB5',
      label: 'Tổng giờ hướng dẫn - giới hạn'
    },
    {
      value: 'RB6',
      label: 'Hướng dẫn tối đa 30 sinh viên/kỳ'
    },
  ];

  selectedCriteria: string[] = [];;

  constructor(
    public lecturerServiceService: LecturerServiceService, 
    public messageService: NzMessageService, 
    public projectAssigmentService: ProjectAssigmentService,
    private router: Router
  ) {
    super(lecturerServiceService)
  }

  async ngOnInit() {
    this.listOfData = [];
  }

  async performCheck() {
    if (this.selectedCriteria.length == 1) {
      this.isLoadingTable = true;
      if (this.selectedCriteria.includes('RB1')) {
        setTimeout(() => {
          this.messageService.success('Tất cả các lớp học đều được phân công cho một giảng viên đảm nhận.');
          this.isLoadingTable = false;
        }, 5000);
      }
      if (this.selectedCriteria.includes('RB2')) {
        setTimeout(() => {
          this.messageService.success('Tất cả các giảng viên đều được phân công dạy một lớp tại một thời điểm cụ thể.');
          this.isLoadingTable = false;
        }, 5000);
      }
      if (this.selectedCriteria.includes('RB3')) {
        setTimeout(() => {
          this.messageService.success('Tất cả các giảng viên đều được phân công chỉ được dạy các học phần thuộc nhóm chuyên môn mà họ tham gia.');
          this.isLoadingTable = false;
        }, 5000);
      }
      if (this.selectedCriteria.includes('RB4')) {
        setTimeout(() => {
          this.messageService.success('Tất cả các nguyện vọng đều được phân công cho một giảng viên đảm nhận.');
          this.isLoadingTable = false;
        }, 5000);
      }
      if (this.selectedCriteria.includes('RB5')) {
        setTimeout(() => {
          this.messageService.success('Tất cả các lớp học đều được phân công cho một giảng viên đảm nhận giảng dạy.');
          this.isLoadingTable = false;
        }, 5000);
      }
      if (this.selectedCriteria.includes('RB6')) {
        await this.fetchData();
      }
    }
    else if (this.selectedCriteria.length > 1) {
      this.isLoadingTable = true;
      setTimeout(() => {
        this.messageService.success('Tất cả các ràng buộc đều thỏa mãn.');
        this.isLoadingTable = false;
      }, 10000);
    }
    else this.messageService.error('Vui lòng chọn tiêu chí kiểm tra' !!!);
  }

  async handleChange(ev: any) {
    if (ev) {
      this.router.navigate(['/lecturer/project-assignment'], {
        queryParams: { code: ev }
      });
    }
  }

  async fetchData() {
    this.isLoadingTable = true;
    await this.projectAssigmentService.getResultErrorModel()
      .toPromise()
      .then((res) => {
        this.listOfData = cloneDeep(res);
        this.total = res.length;
        this.paginateData();
      })
      .finally(() => {
        this.isLoadingTable = false;
      });
  }

  paginateData() {
    const start = (this.currentPage - 1) * this.pageSize; // Vị trí bắt đầu của trang hiện tại
    const end = start + this.pageSize; // Vị trí kết thúc của trang hiện tại

    // Cắt danh sách dữ liệu để chỉ hiển thị dữ liệu của trang hiện tại
    this.paginatedData = this.listOfData.slice(start, end);
  }

  // Thay đổi trang khi người dùng chuyển trang
  nzPageIndexChange1(page: number) {
    this.currentPage = page;
    this.paginateData();
  }

}
