import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './home2.component.html',
  styleUrl: './home2.component.scss'
})
export class Home2Component {
  isLoggedIn = true;
  userInfo: any = null;

  constructor(private userService: UserService) {
    // 如果没有登录用户，设置默认用户
    if (!this.userService.getIsLoggedIn()) {
      this.userService.setDefaultUser();
    }
    this.userInfo = this.userService.getCurrentUser();
  }
}
