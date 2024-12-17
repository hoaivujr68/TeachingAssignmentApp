import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { cloneDeep } from 'lodash';
import { TeachingAssigmentService } from 'src/app/service/teaching-assigment.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teaching-assignment',
  templateUrl: './teaching-assignment.component.html',
  styleUrls: ['./teaching-assignment.component.scss']
})
export class TeachingAssignmentComponent extends LecturerManagementComponent {
  userRole: string = 'lanhdao';
  listOfTeacher: any[] = [];
  isModalVisible: boolean = false;
  titleModal: string = '';
  rangeGdTeaching: any;
  initialCurrentAssignment: number | null = null;
  initialCurrentRange: number | null = null;
  initialNewAssignment: number | null = null;
  initialNewRange: number | null = null;

  @Input() form: FormGroup = this.fb.group({
    id: [null],
    code: [null],
    name: [null],
    type: [null],
    courseName: [null],
    groupName: [null],
    maxEnrol: [null],
    timeTable: [null],
    gdTeaching: [null],
    timeTableDetail: [null],
    teacherCode: [null],
    teachingName: [null],
    currentTeacher: [null],
    currentCode: [null],
    gdTeacher: [null],
    gdAssignment: [null],
    currentRange: [null],
    rangeTeaching: [null],
    currentAssignment: [null],
    gdRange: [null],
  });

  constructor(
    public lecturerServiceService: LecturerServiceService,
    public teachingAssigmentService: TeachingAssigmentService,
    private message: NzMessageService,
    public fb: FormBuilder,
    protected cdr: ChangeDetectorRef
  ) {
    super(lecturerServiceService);
  }

  async ngOnInit() {
    super.ngOnInit();
    this.checkRole();
    await this.getRangeGdTeaching();
  }

  async getRangeGdTeaching() {
    await this.teachingAssigmentService.rangeGdTeaching()
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.rangeGdTeaching = res;
          this.form.get('rangeTeaching')?.setValue(this.rangeGdTeaching);
        }
      })
  }

  async getListTeacher(code: string) {
    this.isLoadingTable = true;
    await this.teachingAssigmentService.getTeacherByClassFilter(JSON.stringify(code))
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listOfTeacher = res;
        }
      })
      .finally(() => {
        this.isLoadingTable = false;
      });
  }

  async submitModel() {
    const payload = this.form.value;
    await this.teachingAssigmentService.updateTeachingAssignment(payload)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.message.success('Thay đổi phân công thành công');
          this.isModalVisible = false;
        }
      });

    await this.fetchData();
  }

  checkRole() {
    const userRole = localStorage.getItem('listRoles');
    this.userRole = userRole;
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

  async handleCancel() {
    this.isModalVisible = false;

    // Khôi phục giá trị ban đầu
    this.restoreInitialValues();

    this.form.reset();
    await this.fetchData();
  }

  restoreInitialValues() {
    if (this.initialCurrentAssignment !== null) {
      this.form.get('currentAssignment')?.setValue(this.initialCurrentAssignment);
      this.form.get('currentRange')?.setValue(this.initialCurrentRange);
    }
    if (this.initialNewAssignment !== null) {
      this.form.get('gdAssignment')?.setValue(this.initialNewAssignment);
      this.form.get('gdRange')?.setValue(this.initialNewRange);
    }
  }

  async handleOpen(data: any) {
    this.isModalVisible = true;
    this.titleModal = data.code;

    const customTeacher = `${data.teacherCode} - ${data.teachingName}`;

    await this.getListTeacher(data.code);

    this.form.patchValue({
      code: data.code,
      name: data.name,
      currentTeacher: customTeacher,
      currentCode: data.teacherCode,
      gdTeaching: data.gdTeaching,
      id: data.id,
      courseName: data.courseName,
      groupName: data.groupName,
      maxEnrol: data.maxEnrol,
      timeTable: data.timeTable,
      timeTableDetail: data.timeTableDetail,
      rangeTeaching: this.rangeGdTeaching
    });

    const currentTeacher = this.listOfTeacher.find(item => item.code === data.teacherCode);
    if (currentTeacher) {
      try {
        const res = await this.teachingAssigmentService.getTotalGdByTeacherCode(JSON.stringify(data.teacherCode)).toPromise();
        if (res) {
          this.form.patchValue({
            currentAssignment: res,
            currentRange: (res / currentTeacher.gdTeaching).toFixed(2)
          });
        }
      } catch (error) {
        console.error('Error fetching current teacher data:', error);
      }
    }
    this.initialCurrentAssignment = this.form.get('currentAssignment')?.value || 0;
    this.initialCurrentRange = this.form.get('currentRange')?.value || 0;
  }

  async onTeacherCodeChange(code: string) {
    if (!code) return;

    // Khôi phục giá trị ban đầu của giảng viên cũ
    this.restoreInitialValues();

    const teacher = this.listOfTeacher.find(item => item.code === code);
    if (teacher) {
      this.form.get('gdTeacher')?.setValue(teacher.gdTeaching);

      // Lưu giá trị ban đầu của giảng viên mới
      this.initialNewAssignment = this.form.get('gdAssignment')?.value || 0;
      this.initialNewRange = this.form.get('gdRange')?.value || 0;

      try {
        const res = await this.teachingAssigmentService.getTotalGdByTeacherCode(JSON.stringify(teacher.code)).toPromise();
        if (res) {
          this.form.patchValue({
            gdAssignment: res,
            gdRange: (res / teacher.gdTeaching).toFixed(2)
          });
        }
      } catch (error) {
        console.error('Error fetching new teacher data:', error);
      }
    }
  }

  handleTryAssignment() {
    const currentTeacher = this.listOfTeacher.find(item => item.code === this.form.get('currentCode')?.value);
    const newTeacher = this.listOfTeacher.find(item => item.code === this.form.get('teacherCode')?.value);

    if (currentTeacher && newTeacher) {
      const newCurrentAssignment = this.form.get('currentAssignment')?.value - this.form.get('gdTeaching')?.value;
      const newCurrentRange = (newCurrentAssignment / currentTeacher.gdTeaching).toFixed(2);

      const newGdAssignment = this.form.get('gdAssignment')?.value + this.form.get('gdTeaching')?.value;
      const newGdRange = (newGdAssignment / newTeacher.gdTeaching).toFixed(2);

      this.form.patchValue({
        currentAssignment: newCurrentAssignment,
        currentRange: newCurrentRange,
        gdAssignment: newGdAssignment,
        gdRange: newGdRange
      });
    }
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
      this.message.success("Xuất file phân công theo giảng viên thành công");
    } catch (error) {
      // Xử lý lỗi
      this.message.error("Xuất file phân công theo giảng viên thất bại!!!");
    } finally {
      this.isLoadingTable = false;
    }
  }

  async handleExportDataClass() {
    this.isLoadingTable = true;
    try {
      // Gọi API và chờ đợi phản hồi blob
      const res: Blob = await this.teachingAssigmentService.exportClassAssignment().toPromise();

      // Tạo URL tạm thời cho file blob
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Thay đổi type nếu cần
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'ClassAssignments.xlsx';  // Tên file muốn tải xuống
      link.click();  // Mô phỏng việc nhấp chuột vào link tải xuống

      // Thông báo thành công
      this.message.success("Xuất file phân công theo lớp thành công");
    } catch (error) {
      // Xử lý lỗi
      this.message.error("Xuất file phân công theo lớp thất bại!!!");
    } finally {
      this.isLoadingTable = false;
    }
  }
  selectedIds: Set<string> = new Set(); // Chứa ID các bản ghi được chọn
  isConfirmPopupVisible: boolean = false; // Trạng thái popup xác nhận

  onItemChecked(id: string, checked: boolean): void {
    if (checked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }

    if (this.selectedIds.size === 2) {
      this.isConfirmPopupVisible = true;
    } else {
      this.isConfirmPopupVisible = false;
    }
  }

  async confirmChangeAssignment() {
    // Xử lý logic khi người dùng xác nhận đổi phân công
    console.log('Selected IDs for change:', Array.from(this.selectedIds));
  
    const payload = {
      TeacherAssignmentIds: Array.from(this.selectedIds) // Đảm bảo đây là một mảng
    };
  
    await this.teachingAssigmentService.swapTeacherAssignment(payload)
      .toPromise()
      .then((res) => {
        this.message.success("Đổi phân công thành công");
      })
      .catch((err) => {
        this.message.error("Đổi phân công thất bại. Vui lòng thử lại.");
        console.error(err);
      });
  
    await this.fetchData();
    this.isConfirmPopupVisible = false;
    this.selectedIds.clear(); // Reset danh sách chọn
  }  

  cancelChangeAssignment(): void {
    // Đóng popup nếu người dùng huỷ
    this.isConfirmPopupVisible = false;
    this.selectedIds.clear();
  }

}

