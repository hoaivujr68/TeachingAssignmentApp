import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isCollapsed = false;
  userName: string = '';
  userRole: string = 'Leader';

  constructor(private router: Router) {}
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.checkRole();
  }

  logout(): void {
    // Xóa token, hoặc làm các bước đăng xuất khác
    console.log('Đăng xuất');
    localStorage.removeItem('access_token');
    // Điều hướng về trang đăng nhập
    this.router.navigate(['/login']);
  }

  checkRole(){
    const userRole = localStorage.getItem('listRoles');
    this.userRole = userRole;
  }
}
