import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {

  credentials = {
    username: '',
    email: '',
    password: '',
  };

  constructor(public userService: UserService, private message: NzMessageService, private router: Router) { }

  buildQueryString() {
    const queryModel = {
      username: this.credentials.username,
      email: this.credentials.email,
      password: this.credentials.password,
    };
    return queryModel;
  }

  async signUp() {
    const queryString = this.buildQueryString();
    await this.userService.signUp(queryString)
    .toPromise()
    .then((res: any) => {
      if (res) {
        this.message.success("Đăng ký thành công");
        this.router.navigate(['/login']);
      }
    })
    .catch((error) => {
      this.message.error("Đăng ký thất bại!!!");
    })
  }

}
