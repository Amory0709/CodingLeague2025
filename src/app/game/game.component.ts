import { Component } from '@angular/core';
import { CookieComponent } from '../cookie/cookie.component';
import { PopupComponent } from '../popup/popup.component';
import { HelpComponent } from '../help/help.component';
import { NgForOf, NgIf } from '@angular/common';
import { Step1Component } from '../step1/step1.component';
import { ProfileComponent } from '../profile/profile.component';
import { InterestsComponent } from '../interests/interests.component';
import { Step4Component } from '../step4/step4.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService, UserInfo } from '../services/user.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CookieComponent, PopupComponent, HelpComponent, Step1Component, ProfileComponent, InterestsComponent, Step4Component, NgIf, NgForOf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  showCookie = true;
  showHelp = false;
  stepActive = 0;
  steps = [1, 2, 3, 4];
  currentStep = 1;
  email?: string;
  team: string = '';
  
  // 用户信息收集
  userProfileData: any = {};
  userInterests: string[] = [];

  constructor(
    private readonly http: HttpClient, 
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    // 移除计时器和弹窗逻辑
  }

  handleCookieClose() {
    this.showCookie = false;
  }

  handleNextStep1($event: string[]): void {
    this.email = $event[0];
    this.team = $event[1];
    this.currentStep = 2;
    this.stepActive = 1;
  }

  handleNextStep2(profileData: any): void {
    this.userProfileData = profileData;
    this.currentStep = 3;
    this.stepActive = 2;
  }

  handleNextStep3(interests: string[]): void {
    this.userInterests = interests;
    this.currentStep = 4;
    this.stepActive = 3;
  }

  handleNextStep4(): void {
    // 创建完整的用户信息
    const userInfo: UserInfo = {
      name: this.userProfileData.name || 'User',
      email: this.email || '',
      team: this.team,
      avatar: this.userProfileData.avatar,
      title: this.userProfileData.title,
      gender: this.userProfileData.gender,
      address: this.userProfileData.address,
      interests: this.userInterests
    };

    this.http.post('http://163.184.177.130/api/register', { username: this.email, teamname: this.team }).subscribe(() => {
      // 注册成功后设置用户信息
      this.userService.setUserInfo(userInfo);
      this.router.navigate(['/congrats']);
    });
  }

  handleHelpOpen() {
    this.showHelp = true;
  }

  handleHelpClose() {
    this.showHelp = false;
  }
}
