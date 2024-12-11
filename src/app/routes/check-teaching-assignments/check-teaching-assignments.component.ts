import { Component, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';

@Component({
  selector: 'app-check-teaching-assignments',
  templateUrl: './check-teaching-assignments.component.html',
  styleUrls: ['./check-teaching-assignments.component.scss']
})
export class CheckTeachingAssignmentsComponent extends LecturerManagementComponent {

  async ngOnInit() {
    this.listOfData = [
      {
        code: 'RB1',
        name: 'Một lớp - Một giáo viên',
        detail: 'Mỗi lớp học chỉ được phân công cho một giảng viên đảm nhận giảng dạy.',
        type: 'Ràng buộc cứng'
      },
      {
        code: 'RB2',
        name: 'Một thời điểm - Một lớp',
        detail: 'Mỗi giảng viên chỉ dạy một lớp tại một thời điểm cụ thể (không trùng lịch dạy).',
        type: 'Ràng buộc cứng'
      },
      {
        code: 'RB3',
        name: 'Đúng chuyên môn',
        detail: 'Giảng viên chỉ được dạy các học phần thuộc nhóm chuyên môn mà họ tham gia.',
        type: 'Ràng buộc cứng'
      },
      {
        code: 'RB4',
        name: 'Một nguyện vọng - Một giảng viên',
        detail: 'Các nguyện vọng của sinh viên về giáo viên hướng dẫn đồ án phải được đáp ứng và chỉ định đúng 1 giảng viên hướng dẫn cho mỗi nguyện vọng.',
        type: 'Ràng buộc cứng'
      },
      {
        code: 'RB5',
        name: 'Tổng giờ hướng dẫn - giới hạn',
        detail: 'Tổng thời gian hướng dẫn và giảng dạy của giảng viên trong kỳ phải nhỏ hơn hoặc bằng 2 lần số giờ trung bình dành cho giảng dạy, nghiên cứu và quản lý.',
        type: 'Ràng buộc cứng'
      },
      {
        code: 'RB6',
        name: 'Hướng dẫn tối đa 30 sinh viên/kỳ',
        detail: 'Một giảng viên chỉ được hướng dẫn tối đa 30 sinh viên trong một kỳ học (bao gồm tất cả các học phần).',
        type: 'Ràng buộc cứng'
      },
      {
        code: 'RB7',
        name: 'Cùng ngày học',
        detail: 'Ưu tiên giảng viên được phân công các môn học có thời gian giảng dạy trong cùng một ngày (để tối ưu thời gian đi lại và lịch làm việc).',
        type: 'Ràng buộc mềm'
      },
      {
        code: 'RB8',
        name: 'Giờ giảng dạy cân bằng',
        detail: 'Đảm bảo chênh lệch số giờ giảng dạy giữa các giảng viên không quá 2 giờ (để phân bổ công việc đồng đều).',
        type: 'Ràng buộc mềm'
      },
      {
        code: 'RB9',
        name: 'Nguyện vọng hướng dẫn đúng',
        detail: 'Đảm bảo các nguyện vọng đồ án của sinh viên được chỉ định cho một giảng viên nằm trong danh sách ba nguyện vọng đã chọn của họ.',
        type: 'Ràng buộc mềm'
      }
    ];
    
  }
}
