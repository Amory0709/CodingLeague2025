import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserService, UserInfo } from './services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public userService: UserService) {}
  
  get isLoggedIn() {
    return this.userService.getIsLoggedIn();
  }
  
  get userInfo() {
    return this.userService.getCurrentUser();
  }
}
