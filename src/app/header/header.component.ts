import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() userInfo: any = null;
  
  // 默认匿名用户信息
  anonymousUser = {
    name: 'Anonymous User',
    avatar: 'assets/default-avatar.svg'
  };
}
