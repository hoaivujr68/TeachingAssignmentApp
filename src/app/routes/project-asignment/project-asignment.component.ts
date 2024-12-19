import { cloneDeep } from 'lodash';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { ProjectAssigmentService } from 'src/app/service/project-assigment.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-asignment',
  templateUrl: './project-asignment.component.html',
  styleUrls: ['./project-asignment.component.scss']
})
export class ProjectAsignmentComponent extends LecturerManagementComponent {
  userRole: string = 'lanhdao';
  listOfTeacher: any[] = [];
  isModalVisible: boolean = false;
  titleModal: string = '';
  initialCurrentAssignment: number | null = null;
  initialCurrentRange: number | null = null;
  initialNewAssignment: number | null = null;
  initialNewRange: number | null = null;
  rangeGdTeaching: any;
  codeFromRoute: any;

  @Input() form: FormGroup = this.fb.group({
    id: [null],
    studentId: [null],
    studentName: [null],
    gdInstruct: [null],
    gdTeacher: [null],
    gdAssignment: [null],
    currentAssignment: [null],
    currentTeacher: [null],
    teacherCode: [null],
    rangeInstruct: [null],
    currentInstruct: [null],
    currentRange: [null],
    gdRange: [null],
    currentCode: [null],
  });

  constructor(
    public lecturerServiceService: LecturerServiceService,
    public projectAssigmentService: ProjectAssigmentService,
    private message: NzMessageService,
    public fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(lecturerServiceService);
  }

  async ngOnInit() {
    this.codeFromRoute = this.route.snapshot.queryParamMap.get('code') || '';
    if (this.codeFromRoute) {
      this.request.listTextSearch = [this.codeFromRoute];
    }
    if (!history.state.fromCriteriaCheck && this.codeFromRoute) {
      // Xóa query param 'code' khỏi URL
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { code: null },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    }
    super.ngOnInit();
    this.checkRole();
    await this.getRangeGdInstruct();
  }

  async getRangeGdInstruct() {
    await this.projectAssigmentService.rangeGdInstruct()
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.rangeGdTeaching = res;
          this.form.get('rangeInstruct')?.setValue(this.rangeGdTeaching);
        }
      })
  }

  checkRole() {
    const userRole = localStorage.getItem('listRoles');
    this.userRole = userRole;
  }

  async nzOnSearch(ev: any) {
    this.request.page = 1;
    this.codeFromRoute = null;
    await this.fetchData();
  }

  async fetchData() {
    this.isLoadingTable = true;
    const queryString = this.buildQueryString();
    await this.projectAssigmentService.getProjectAssignmentFilter(queryString)
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

  async hanleClick(ev: any) {
    this.isLoadingTable = true;
    await this.projectAssigmentService.projectAssignment()
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.fetchData();
          this.message.success("Phân công hướng dẫn đồ án thành công");
        }
      })
      .finally(() => {
        this.isLoadingTable = false;
      });
  }

  async handleReload(ev: any) {
    await this.fetchData();
  }

  async getListTeacher(code: string) {
    this.isLoadingTable = true;
    await this.projectAssigmentService.getTeacherByStudentFilter(JSON.stringify(code))
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
    await this.projectAssigmentService.updateProjectAssignment(payload)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.message.success('Thay đổi phân công thành công');
          this.isModalVisible = false;
        }
      });

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

  async handleCancel() {
    this.isModalVisible = false;
    this.restoreInitialValues();
    this.form.reset();
    await this.fetchData();
  }

  async handleOpen(data: any) {
    await this.getListTeacher(data.studentId);
    this.isModalVisible = true;
    this.titleModal = data.studentId;
    const customTeacher = `${data.teacherCode} - ${data.teacherName}`;

    this.form.patchValue({
      code: data.code,
      name: data.name,
      currentTeacher: customTeacher,
      currentCode: data.teacherCode,
      gdInstruct: data.gdInstruct,
      id: data.id,
      studentId: data.studentId,
      studentName: data.studentName,
      currentAssignment: data.currentAssignment,
      rangeInstruct: this.rangeGdTeaching
    });

    const currentTeacher = this.listOfTeacher.find(item => item.code === data.teacherCode);
    if (currentTeacher) {
      try {
        const res = await this.projectAssigmentService.getTotalGdByTeacherCode(JSON.stringify(data.teacherCode)).toPromise();
        if (res) {
          this.form.patchValue({
            currentAssignment: res,
            currentRange: (res / currentTeacher.gdInstruct).toFixed(2)
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
      this.form.get('gdTeacher')?.setValue(teacher.gdInstruct);

      // Lưu giá trị ban đầu của giảng viên mới
      this.initialNewAssignment = this.form.get('gdAssignment')?.value || 0;
      this.initialNewRange = this.form.get('gdRange')?.value || 0;

      try {
        const res = await this.projectAssigmentService.getTotalGdByTeacherCode(JSON.stringify(teacher.code)).toPromise();
        if (res) {
          this.form.patchValue({
            gdAssignment: res,
            gdRange: (res / teacher.gdInstruct).toFixed(2)
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
      const newCurrentAssignment = this.form.get('currentAssignment')?.value - this.form.get('gdInstruct')?.value;
      const newCurrentRange = (newCurrentAssignment / currentTeacher.gdInstruct).toFixed(2);

      const newGdAssignment = this.form.get('gdAssignment')?.value + this.form.get('gdInstruct')?.value;
      const newGdRange = (newGdAssignment / newTeacher.gdInstruct).toFixed(2);

      this.form.patchValue({
        currentAssignment: newCurrentAssignment,
        currentRange: newCurrentRange,
        gdAssignment: newGdAssignment,
        gdRange: newGdRange
      });
    }
  }

  async handleExportDataQuota() {
    this.isLoadingTable = true;
    try {
      // Gọi API và chờ đợi phản hồi blob
      const res: Blob = await this.projectAssigmentService.exportProjectAssignmentByQuota().toPromise();

      // Tạo URL tạm thời cho file blob
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Thay đổi type nếu cần
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'ProjectAssignmentStatistical.xlsx';  // Tên file muốn tải xuống
      link.click();  // Mô phỏng việc nhấp chuột vào link tải xuống

      // Thông báo thành công
      this.message.success("Xuất file thống kê phân công thành công");
    } catch (error) {
      // Xử lý lỗi
      this.message.error("Xuất file thống kê phân công thất bại!!!");
    } finally {
      this.isLoadingTable = false;
    }
  }

  async handleExportData() {
    this.isLoadingTable = true;
    try {
      // Gọi API và chờ đợi phản hồi blob
      const res: Blob = await this.projectAssigmentService.exportProjectAssignment().toPromise();

      // Tạo URL tạm thời cho file blob
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Thay đổi type nếu cần
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'ProjectAssignmentss.xlsx';  // Tên file muốn tải xuống
      link.click();  // Mô phỏng việc nhấp chuột vào link tải xuống

      // Thông báo thành công
      this.message.success("Xuất file phân công đồ án theo giảng viên thành công");
    } catch (error) {
      // Xử lý lỗi
      this.message.error("Xuất file phân công đồ án theo giảng viên thất bại!!!");
    } finally {
      this.isLoadingTable = false;
    }
  }

  async handleExportDataAspiration() {
    this.isLoadingTable = true;
    try {
      // Gọi API và chờ đợi phản hồi blob
      const res: Blob = await this.projectAssigmentService.exportAspirationAssignment().toPromise();

      // Tạo URL tạm thời cho file blob
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Thay đổi type nếu cần
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'AspirationAssignmentss.xlsx';  // Tên file muốn tải xuống
      link.click();  // Mô phỏng việc nhấp chuột vào link tải xuống

      // Thông báo thành công
      this.message.success("Xuất file phân công đồ án theo nguyện vọng thành công");
    } catch (error) {
      // Xử lý lỗi
      this.message.error("Xuất file phân công đồ án theo nguyện vọng thất bại!!!");
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

    await this.projectAssigmentService.swapTeacherAssignment(payload)
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
