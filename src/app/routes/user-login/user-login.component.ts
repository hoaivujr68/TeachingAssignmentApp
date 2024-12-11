import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(public userService: UserService, private message: NzMessageService, private router: Router) { }

  buildQueryString() {
    const queryModel = {
      email: this.credentials.email,
      password: this.credentials.password,
    };
    return queryModel;
  }

  async login() {
    const queryString = this.buildQueryString();
    await this.userService.signIn(queryString)
    .toPromise()
    .then((res: any) => {
      if (res) {
        localStorage.setItem('access_token', res.data.token);
        localStorage.setItem('userName', res.data.username);
        localStorage.setItem('listRoles', res.data.roles);
        this.message.success("Đăng nhập thành công");
        if (res.data.roles == 'admin') this.router.navigate(['/lecturer/import-data']);
        else this.router.navigate(['/dashboard']);
      }
    })
    .catch((error) => {
      this.message.error("Đăng nhập thất bại!!!");
    })
  }

}
