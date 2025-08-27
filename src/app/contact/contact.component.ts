import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NgIf } from '@angular/common';
import { CanComponentDeactivate } from '../guards/can-deactivate.guard';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RouterModule, HeaderComponent, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements CanComponentDeactivate {
  isLoggedIn = false;
  userInfo = null;
  
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  errors = {
    name: false,
    email: false,
    subject: false,
    message: false
  };
  
  errorMessages = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private router: Router) {}

  // 检查表单是否有数据
  hasFormData(): boolean {
    return !!(this.formData.name || 
              this.formData.email || 
              this.formData.subject || 
              this.formData.message);
  }

  // 实现CanComponentDeactivate接口
  canDeactivate(): boolean {
    if (this.hasFormData()) {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateForm(): boolean {
    let isValid = true;
    
    // 验证姓名
    if (!this.formData.name || this.formData.name.trim() === '') {
      this.errors.name = true;
      this.errorMessages.name = 'Name is required';
      isValid = false;
    } else {
      this.errors.name = false;
    }
    
    // 验证邮箱
    if (!this.formData.email) {
      this.errors.email = true;
      this.errorMessages.email = 'Email is required';
      isValid = false;
    } else if (!this.validateEmail(this.formData.email)) {
      this.errors.email = true;
      this.errorMessages.email = 'Please enter a valid email address';
      isValid = false;
    } else {
      this.errors.email = false;
    }
    
    // 验证主题
    if (!this.formData.subject || this.formData.subject.trim() === '') {
      this.errors.subject = true;
      this.errorMessages.subject = 'Subject is required';
      isValid = false;
    } else {
      this.errors.subject = false;
    }
    
    // 验证消息
    if (!this.formData.message || this.formData.message.trim() === '') {
      this.errors.message = true;
      this.errorMessages.message = 'Message is required';
      isValid = false;
    } else {
      this.errors.message = false;
    }
    
    return isValid;
  }

  onSubmit() {
    if (this.validateForm()) {
      // 发送消息逻辑
      console.log('Sending message:', this.formData);
      alert('Thank you for your message! We will get back to you soon.');
      this.router.navigate(['/']);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
