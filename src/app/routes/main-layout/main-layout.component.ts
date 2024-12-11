import { cloneDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/service/feedback.service';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent extends LecturerManagementComponent{
  isCollapsed = false;
  userName: string = '';
  userRole: string = 'lanhdao';
  activeMenu: string | null = null; // Trạng thái của submenu đang mở
  
  constructor(private router: Router, public feedbackService: FeedbackService, public lecturerServiceService: LecturerServiceService) {
    super(lecturerServiceService);
  }
  async ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.checkRole();
    await this.checkTotalFeedBack();
  }

  async checkTotalFeedBack(){
    const queryString = this.buildQueryString();
    await this.feedbackService.getFeedback(queryString)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listOfData = cloneDeep(res.content);
          this.total = res.totalRecords;
        }
      })
  }

  toggleMenu(menuName: string): void {
    // Đóng tất cả các menu khác
    this.activeMenu = this.activeMenu === menuName ? null : menuName;
  }

  closeAllSubmenus(): void {
    this.activeMenu = null; // Đóng tất cả menu cha
  }

  logout(): void {
    // Xóa token, hoặc làm các bước đăng xuất khác
    console.log('Đăng xuất');
    localStorage.removeItem('access_token');
    localStorage.removeItem('userName');
    localStorage.removeItem('listRoles');
    this.router.navigate(['/login']);
  }

  checkRole(){
    const userRole = localStorage.getItem('listRoles');
    this.userRole = userRole;
  }
}
