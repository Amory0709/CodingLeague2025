import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserInfo {
  name: string;
  email: string;
  team: string;
  avatar?: string;
  title?: string;
  gender?: string;
  address?: string;
  interests?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfoSubject = new BehaviorSubject<UserInfo | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  
  userInfo$ = this.userInfoSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  constructor() {
    // 从localStorage恢复用户状态
    this.loadUserFromStorage();
  }
  
  private loadUserFromStorage() {
    const savedUser = localStorage.getItem('userInfo');
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    
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
    
    // 保存到localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
  }
  
  clearUserInfo() {
    this.userInfoSubject.next(null);
    this.isLoggedInSubject.next(false);
    
    // 清除localStorage
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLoggedIn');
  }
  
  getCurrentUser(): UserInfo | null {
    return this.userInfoSubject.value;
  }
  
  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
  
  updateUserInfo(updates: Partial<UserInfo>) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      this.setUserInfo(updatedUser);
    }
  }
}
