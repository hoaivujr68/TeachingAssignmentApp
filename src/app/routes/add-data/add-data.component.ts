import {LecturerServiceService} from '../../service/lecturer-service.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { ClassService } from 'src/app/service/class.service';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent{
  constructor(
    private msg: NzMessageService,
    public classService: ClassService,
    public lecturerServiceService: LecturerServiceService
  ) { }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
  
}
