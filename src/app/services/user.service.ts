import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserInfo {
  name: string;
  email: string;
  team: string;
  avatar?: string;
  title?: string;
  address?: string;
  birthYear?: string;
  birthMonth?: string;
  birthDay?: string;
  interests?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfoSubject = new BehaviorSubject<UserInfo | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  userInfo$ = this.userInfoSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // 从sessionStorage恢复用户状态
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const savedUser = sessionStorage.getItem('userInfo');
    const savedLoginStatus = sessionStorage.getItem('isLoggedIn');

    if (savedUser) {
      this.userInfoSubject.next(JSON.parse(savedUser));
    }

    if (savedLoginStatus) {
      this.isLoggedInSubject.next(JSON.parse(savedLoginStatus));
    }
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfoSubject.next(userInfo);
    this.isLoggedInSubject.next(true);

    // 保存到sessionStorage
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
  }

  setDefaultUser() {
    const defaultUser: UserInfo = {
      name: 'mhan8@slb.com',
      email: 'mhan8@slb.com',
      team: 'SLB Team',
      avatar: 'assets/default-avatar.svg',
    };
    this.setUserInfo(defaultUser);
  }

  updateUserAvatar(avatarUrl: string) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, avatar: avatarUrl };
      this.setUserInfo(updatedUser);
    }
  }

  updateUserProfile(profileData: Partial<UserInfo>) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profileData };
      this.setUserInfo(updatedUser);
    }
  }

  clearUserInfo() {
    this.userInfoSubject.next(null);
    this.isLoggedInSubject.next(false);

    // 清除sessionStorage
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('isLoggedIn');
  }

  getCurrentUser(): UserInfo | null {
    return this.userInfoSubject.value;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
