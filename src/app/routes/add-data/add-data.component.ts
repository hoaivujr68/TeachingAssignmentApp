import {LecturerServiceService} from '../../service/lecturer-service.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { ClassService } from 'src/app/service/class.service';
import { AspirationService } from 'src/app/service/aspiration.service';
import { ProfessionalGroupService } from 'src/app/service/professional-group.service';
import { ProjectService } from 'src/app/service/project.service';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent{
  constructor(
    private msg: NzMessageService,
    public classService: ClassService,
    public lecturerServiceService: LecturerServiceService,
    public teacherService: LecturerServiceService,
    public aspirationService: AspirationService,
    public professionalGroupService: ProfessionalGroupService,
    public projectService: ProjectService,
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

  downloadTemplateTeacher(){
    this.teacherService.downloadTemplateTeacher();
  }

  downloadTemplateAspiration(){
    this.aspirationService.downloadTemplateAspiration();
  }

  downloadTemplateClass(){
    this.classService.downloadTemplateClass();
  }

  downloadTemplateProfessional(){
    this.professionalGroupService.downloadTemplateProfessional();
  }

  downloadTemplateProject(){
    this.projectService.downloadTemplateProject();
  }
  
}
