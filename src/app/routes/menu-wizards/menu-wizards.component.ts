import { LecturerServiceService } from '../../service/lecturer-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { ClassService } from 'src/app/service/class.service';
import { AspirationService } from 'src/app/service/aspiration.service';
import { ProfessionalGroupService } from 'src/app/service/professional-group.service';
import { ProjectService } from 'src/app/service/project.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeachingAssigmentService } from 'src/app/service/teaching-assigment.service';
import { Router } from '@angular/router';
import { ProjectAssigmentService } from 'src/app/service/project-assigment.service';

@Component({
  selector: 'app-menu-wizards',
  templateUrl: './menu-wizards.component.html',
  styleUrls: ['./menu-wizards.component.scss']
})
export class MenuWizardsComponent {
  @Input() form: FormGroup = this.fb.group({
    typeAssignment: [null],
    algorithm: [null],
  });
  isLoadingTable: boolean = false;
  isSpinning: boolean = false;
  currentStep = 0;
  typeAssignment = 'teaching';
  listResultHeader: any[] = [];
  listResultTable: any[] = [];
  totalTeacher: any;
  totalClass: any;
  totalAspirations: any;
  listTypeAssignment: any[] = [
    {
      value: 'teaching',
      label: 'Phân công giảng dạy'
    },
    {
      value: 'projecting',
      label: 'Phân công hướng dẫn đồ án'
    }
  ]

  algorithmText: string = 'Harmony Search';
  algorithm = 'harmony';
  listAlgorithm: any[] = [
    {
      value: 'harmony',
      label: 'Harmony Search'
    },
    {
      value: 'cuckoo',
      label: 'Cuckoo Search'
    }
  ]
  allChecked = false;
  indeterminate = true;
  checkOptionsTeaching = [
    { label: 'Một lớp - Một giáo viên (Mỗi lớp học chỉ được phân công cho một giảng viên đảm nhận giảng dạy).', value: 'RB1', checked: true },
    { label: 'Một thời điểm - Một lớp (Mỗi giảng viên chỉ dạy một lớp tại một thời điểm cụ thể).', value: 'RB2', checked: false },
    { label: 'Đúng chuyên môn (Giảng viên chỉ được dạy các học phần thuộc nhóm chuyên môn mà họ tham gia).', value: 'RB3', checked: false },
    { label: 'Số giờ phân công thỏa mãn (Tổng thời gian phân công của giảng viên phải nhỏ hơn hoặc bằng 1.5 lần số giờ giảng dạy tối đa).', value: 'RB5', checked: false },
    { label: 'Cùng ngày học (Ưu tiên giảng viên được phân công các môn học có thời gian giảng dạy trong cùng một ngày).', value: 'RB7', checked: false },
    { label: 'Giờ giảng dạy cân bằng (Đảm bảo chênh lệch tỷ lệ giờ phân công giảng dạy giữa các giảng viên không quá 20%).', value: 'RB8', checked: false }
  ];
  checkOptionsProject = [
    { label: 'Một đồ án - Một giảng viên (Mỗi đồ án chỉ được phân công cho một giảng viên đảm nhận hướng dẫn).', value: 'RB4', checked: true },
    { label: 'Hướng dẫn tối đa 30 sinh viên/kỳ (Một giảng viên chỉ được hướng dẫn tối đa 30 sinh viên trong một kỳ học).', value: 'RB6', checked: false },
    { label: 'Số giờ phân công thỏa mãn (Tổng thời gian phân công của giảng viên phải nhỏ hơn hoặc bằng 1.5 lần số giờ hướng dẫn tối đa).', value: 'RB5', checked: false },
    { label: 'Nguyện vọng hướng dẫn đúng (Đảm bảo các nguyện vọng đồ án của sinh viên được chỉ định cho một giảng viên nằm trong danh sách ba nguyện vọng đã chọn của họ).', value: 'RB9', checked: false },
  ];
  checkOptionsOne = this.checkOptionsTeaching;

  constructor(
    public classService: ClassService,
    public lecturerServiceService: LecturerServiceService,
    public teacherService: LecturerServiceService,
    public aspirationService: AspirationService,
    public professionalGroupService: ProfessionalGroupService,
    public projectService: ProjectService,
    public fb: FormBuilder,
    public teachingAssigmentService: TeachingAssigmentService,
    public projectAssigmentService: ProjectAssigmentService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form.get('algorithm')?.setValue('harmony');
    this.form.get('typeAssignment')?.setValue('teaching');
  }

  handleChangeTypeAssignment(ev: any) {
    if (ev == 'teaching') this.checkOptionsOne = this.checkOptionsTeaching;
    else this.checkOptionsOne = this.checkOptionsProject;
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => ({
        ...item,
        checked: true
      }));
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => ({
        ...item,
        checked: false
      }));
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.message.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.message.error(`${file.name} file upload failed.`);
    }
  }

  downloadTemplateTeacher() {
    this.teacherService.downloadTemplateTeacher();
  }

  downloadTemplateAspiration() {
    this.aspirationService.downloadTemplateAspiration();
  }

  downloadTemplateClass() {
    this.classService.downloadTemplateClass();
  }

  downloadTemplateProfessional() {
    this.professionalGroupService.downloadTemplateProfessional();
  }

  downloadTemplateProject() {
    this.projectService.downloadTemplateProject();
  }

  handleChangeBack() {
    this.currentStep -= 1;
  }

  async handleChangeNext() {
    if (this.currentStep == 1) {
      this.isSpinning = true; // Hiển thị spin

      try {
        const typeAssignment = this.form.get('typeAssignment')?.value;
        if (typeAssignment == 'teaching') {
          const teachingResult = await this.teachingAssigmentService.teachingAssignment().toPromise();
          if (teachingResult) {
            const resultModel = await this.teachingAssigmentService.getResultModel().toPromise();
            if (resultModel) {
              const choiceTrue = this.checkOptionsOne.filter((item) => item.checked == true);
              this.listResultHeader = resultModel.filter((item) => item.type == 'Header');
              this.listResultTable = resultModel.filter((item) => item.type == 'Table');
              const choiceValues = choiceTrue.map((item) => item.value); // Lấy tất cả giá trị 'value' từ choiceTrue
              this.listResultTable = this.listResultTable.filter((item) => choiceValues.includes(item.code));
              this.totalClass = resultModel.find((item) => item.code == 'CL')?.value;
              this.totalTeacher = resultModel.find((item) => item.code == 'TC')?.value;
              this.isSpinning = false; // Tắt spin
              this.currentStep += 1;
            }
          }
        }
        else {
          const projectResult = await this.projectAssigmentService.projectAssignment().toPromise();
          if (projectResult) {
            const resultModel = await this.projectAssigmentService.getResultModel().toPromise();
            if (resultModel) {
              const choiceTrue = this.checkOptionsOne.filter((item) => item.checked == true);
              this.listResultHeader = resultModel.filter((item) => item.type == 'Header');
              this.listResultTable = resultModel.filter((item) => item.type == 'Table');
              const choiceValues = choiceTrue.map((item) => item.value); // Lấy tất cả giá trị 'value' từ choiceTrue
              this.listResultTable = this.listResultTable.filter((item) => choiceValues.includes(item.code));
              this.totalClass = resultModel.find((item) => item.code == 'NV')?.value;
              this.totalAspirations = resultModel.find((item) => item.code == 'NV1')?.value;
              this.totalTeacher = resultModel.find((item) => item.code == 'TC')?.value;
              this.isSpinning = false; // Tắt spin
              this.currentStep += 1;
            }
          }
        }
      } catch (error) {
        console.error('Error occurred:', error);
        this.isSpinning = false; // Đảm bảo spin được tắt dù có lỗi
      }
    } else {
      this.currentStep += 1; // Tăng bước ngay lập tức nếu không ở bước 1
    }

    this.algorithm = this.form.get('algorithm')?.value;
    if (this.currentStep == 1) this.checkOptionsOne = this.checkOptionsTeaching;
    if (this.currentStep == 2) this.algorithmText = this.listAlgorithm.find((item) => item.value == this.algorithm)?.label;
  }

  handleApproved() {
    if (this.currentStep == 2) {
      this.isSpinning = true;
      setTimeout(() => {
        this.isSpinning = false;
        this.currentStep += 1;
      }, 6000);
    }
  }

  handleViewResult() {
    if (this.form.get('typeAssignment')?.value == 'teaching') this.router.navigate(['/lecturer/teaching-assignment']);
    else this.router.navigate(['/lecturer/project-assignment']);
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

  async handleExportDataProject() {
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

  async handleExportDataAspiration(){
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
}
