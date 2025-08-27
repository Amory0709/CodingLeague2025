import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NgIf, NgFor } from '@angular/common';
import { UserService } from '../services/user.service';
import { CanComponentDeactivate } from '../guards/can-deactivate.guard';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule, RouterModule, HeaderComponent, NgIf, NgFor],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements CanComponentDeactivate {
  isLoggedIn = true;
  userInfo: any = null;
  
  avatarUrl: string | null = null;
  form = {
    title: '',
    name: '',
    address: '',
    birthYear: '',
    birthMonth: '',
    birthDay: ''
  };

  // 保存原始数据用于比较
  originalForm = {
    title: '',
    name: '',
    address: '',
    birthYear: '',
    birthMonth: '',
    birthDay: ''
  };

  // 称谓选项
  titleOptions = [
    { value: 'mr', label: 'Mr.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'mx', label: 'Mx.' },
    { value: 'dr', label: 'Dr.' },
    { value: 'prof', label: 'Prof.' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not', label: 'Prefer not to say' }
  ];

  // 月份选项
  months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // 年份选项（当前年份往前100年）
  years: string[] = [];
  days: string[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.generateYearOptions();
    this.generateDayOptions();
    this.loadUserData();
  }

  loadUserData() {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.userInfo = currentUser;
      this.avatarUrl = currentUser.avatar || null;
      this.form = {
        title: currentUser.title || '',
        name: currentUser.name || '',
        address: currentUser.address || '',
        birthYear: currentUser.birthYear || '',
        birthMonth: currentUser.birthMonth || '',
        birthDay: currentUser.birthDay || ''
      };
      // 保存原始数据
      this.originalForm = { ...this.form };
    }
  }

  generateYearOptions() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 100; year--) {
      this.years.push(year.toString());
    }
  }

  generateDayOptions() {
    for (let day = 1; day <= 31; day++) {
      this.days.push(day.toString().padStart(2, '0'));
    }
  }

  // 检查表单是否有变化
  hasFormChanges(): boolean {
    return !!(this.form.title !== this.originalForm.title ||
              this.form.name !== this.originalForm.name ||
              this.form.address !== this.originalForm.address ||
              this.form.birthYear !== this.originalForm.birthYear ||
              this.form.birthMonth !== this.originalForm.birthMonth ||
              this.form.birthDay !== this.originalForm.birthDay);
  }

  // 实现CanComponentDeactivate接口
  canDeactivate(): boolean {
    if (this.hasFormChanges()) {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
        // 更新用户服务中的头像
        this.userService.updateUserAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onSave() {
    // 保存个人信息到用户服务
    this.userService.updateUserProfile({
      ...this.form,
      avatar: this.avatarUrl || undefined
    });
    
    // 更新原始数据
    this.originalForm = { ...this.form };
    
    console.log('Saving profile:', { ...this.form, avatar: this.avatarUrl });
    this.router.navigate(['/interests']);
  }

  onCancel() {
    this.router.navigate(['/home2']);
  }
}
