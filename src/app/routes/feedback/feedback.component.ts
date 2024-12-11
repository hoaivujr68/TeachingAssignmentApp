import { cloneDeep } from 'lodash';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { FeedbackService } from 'src/app/service/feedback.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent extends LecturerManagementComponent {
  @Input() form: FormGroup = this.fb.group({
    id: [null],
    code: [null],
    teacherCode: [null],
    teacherName: [null],
    content: [null],
    statusCode: [null],
    statusName: [null],
  });

  isModalVisible: boolean = false;
  currentData: any[] = [];
  isSubmit: boolean = false;
  type: string = 'create';

  constructor(
    public lecturerServiceService: LecturerServiceService,
    public message: NzMessageService,
    public fb: FormBuilder,
    public feedbackService: FeedbackService,
    protected cdr: ChangeDetectorRef
  ) {
    super(lecturerServiceService);
  }

  async fetchData() {
    this.isLoadingTable = true;
    const queryString = this.buildQueryString();
    await this.feedbackService.getFeedback(queryString)
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

  openCreateFeedbackModal(): void {
    this.type = 'create';
    this.form.get('statusCode')?.setValue(1);
    this.isSubmit = false;
    this.form.get('teacherCode')?.setValue(this.userRole);
    this.isModalVisible = true;
  }

  // Đóng modal
  async handleCancel() {
    this.isModalVisible = false;
    this.isSubmit = false;
    this.form.reset();
    await this.fetchData();
  }

  async handleFeedback(data: any) {
    this.form.get('statusCode')?.setValue(2);
    this.form.get('id')?.setValue(data?.id);
    this.form.get('teacherName')?.setValue(data?.teacherName);
    this.form.get('statusName')?.setValue(data?.statusName);
    this.type = 'update';
    await this.submitFeedbackForm();
    await this.handleCancel();
  }

  async handleOk() {
    await this.submitFeedbackForm();
  }

  handleUpdate(data: any) {
    this.currentData = data;
    this.type = 'update';
    this.form.get('id')?.setValue(data?.id);
    this.form.get('code')?.setValue(data?.code);
    this.form.get('content')?.setValue(data?.content);
    this.form.get('statusCode')?.setValue(data?.statusCode);
    this.form.get('teacherCode')?.setValue(data?.teacherCode);
    this.form.get('teacherName')?.setValue(data?.teacherName);
    this.form.get('statusName')?.setValue(data?.statusName);
    if (this.form.get('statusCode')?.value == 3 || this.form.get('statusCode')?.value == 4 ) this.isSubmit = false;
    else this.isSubmit = true;
    this.isModalVisible = true;
  }

  async handleChangeStatus(data: any, status: string){
    this.isModalVisible = false;
    this.currentData = data;
    this.type = 'update';
    this.form.get('id')?.setValue(data?.id);
    this.form.get('code')?.setValue(data?.code);
    this.form.get('content')?.setValue(data?.content);
    this.form.get('teacherCode')?.setValue(data?.teacherCode);
    this.form.get('teacherName')?.setValue(data?.teacherName);
    this.form.get('statusName')?.setValue(data?.statusName);
    if (status == 'accept') this.form.get('statusCode')?.setValue(3);
    if (status == 'ban') this.form.get('statusCode')?.setValue(4);
    await this.submitFeedbackForm();
    this.message.success('Phản hồi thành công');
    await this.fetchData();
  }

  async handleDelete(data: any){
    await this.feedbackService.deleteFeedbackById(data.id).subscribe(
      (res) => {
        this.isSubmit = true;
        this.message.success('Xóa phản hồi thành công', res);
        this.fetchData();
        this.cdr.detectChanges();
        this.cdr.markForCheck();
      },
      (error) => {
        // Xử lý lỗi
        console.error('Error creating feedback', error);
      }
    );
  }

  async submitFeedbackForm() {
    if (this.form.invalid) {
      this.message.error('Các trường thông tin không được để trống !!!');
      return;
    }
    const feedbackData = this.form.value;
    if (this.type == 'create') {
      await this.feedbackService.createFeedback(feedbackData).subscribe(
        (res) => {
          this.isSubmit = true;
          // Xử lý phản hồi từ server (thành công)
          this.currentData = res;
          this.message.success('Tạo phản hồi thành công', res);
          this.cdr.detectChanges();
          this.cdr.markForCheck();
        },
        (error) => {
          // Xử lý lỗi
          console.error('Error creating feedback', error);
        }
      );
    }
    else {
      await this.feedbackService.updateFeedback(feedbackData.id, feedbackData).subscribe(
        (res) => {
          this.isSubmit = true;
          // Xử lý phản hồi từ server (thành công)
          this.currentData = res;
          this.message.success('Cập nhật phản hồi thành công', res);
          this.cdr.detectChanges();
          this.cdr.markForCheck();
        },
        (error) => {
          // Xử lý lỗi
          console.error('Error creating feedback', error);
        }
      );
    }
  }

}
