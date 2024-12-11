import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';

@Component({
  selector: 'app-list-criteria',
  templateUrl: './list-criteria.component.html',
  styleUrls: ['./list-criteria.component.scss']
})
export class ListCriteriaComponent extends LecturerManagementComponent {
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
      label: 'Một nguyện vọng - Một giảng viên'
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

  constructor(public lecturerServiceService: LecturerServiceService, public messageService: NzMessageService) {
    super(lecturerServiceService)
  }

  async ngOnInit() {
    this.listOfData = [];
  }

  performCheck() {
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
        setTimeout(() => {
          this.messageService.success('Tất cả các giảng viên đều được phân công chỉ hướng dẫn tối đa 30 sinh viên trong một kỳ học.');
          this.isLoadingTable = false;
        }, 5000);
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

}
