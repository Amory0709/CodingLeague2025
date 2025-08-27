import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NgIf, NgFor } from '@angular/common';
import { UserService } from '../services/user.service';
import { CanComponentDeactivate } from '../guards/can-deactivate.guard';

interface PasswordRule {
  id: string;
  text: string;
  validator: (password: string) => boolean;
  isCompleted: boolean;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, HeaderComponent, NgIf, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements CanComponentDeactivate {
  isLoggedIn = false;
  userInfo = null;
  showPasswordRules = false;
  
  formData = {
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    team: ''
  };
  
  errors = {
    email: false,
    password: false,
    confirmPassword: false,
    team: false
  };
  
  errorMessages = {
    email: '',
    password: '',
    confirmPassword: '',
    team: ''
  };

  // 密码规则列表
  passwordRules: PasswordRule[] = [
    {
      id: 'length',
      text: 'At least 10 characters',
      validator: (password: string) => password.length >= 10,
      isCompleted: false
    },
    {
      id: 'uppercase',
      text: 'At least 1 uppercase letter',
      validator: (password: string) => /[A-Z]/.test(password),
      isCompleted: false
    },
    {
      id: 'number',
      text: 'At least 1 number',
      validator: (password: string) => /\d/.test(password),
      isCompleted: false
    },
    {
      id: 'special',
      text: 'At least 1 special character',
      validator: (password: string) => /[@$!%*?&]/.test(password),
      isCompleted: false
    }
  ];

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  // 检查表单是否有数据
  hasFormData(): boolean {
    return !!(this.formData.email || 
              this.formData.password || 
              this.formData.confirmPassword || 
              this.formData.userName || 
              this.formData.team);
  }

  // 实现CanComponentDeactivate接口
  canDeactivate(): boolean {
    if (this.hasFormData()) {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }

  // 密码输入框获得焦点时显示规则
  onPasswordFocus() {
    this.showPasswordRules = true;
  }

  // 密码输入时实时验证规则
  onPasswordInput() {
    this.validatePasswordRules();
  }

  // 验证所有密码规则
  validatePasswordRules() {
    this.passwordRules.forEach(rule => {
      rule.isCompleted = rule.validator(this.formData.password);
    });
  }

  // 获取密码规则图标
  getRuleIcon(rule: PasswordRule): string {
    return rule.isCompleted ? '✓' : '❌';
  }

  // 获取密码规则样式类
  getRuleClass(rule: PasswordRule): string {
    return rule.isCompleted ? 'rule-completed' : 'rule-incomplete';
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    // 至少10个字符，包含1个大写字母，1个数字，1个特殊字符
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    return passwordRegex.test(password);
  }

  // Blur验证方法
  onEmailBlur() {
    if (!this.formData.email) {
      this.errors.email = true;
      this.errorMessages.email = 'Email is required';
    } else if (!this.validateEmail(this.formData.email)) {
      this.errors.email = true;
      this.errorMessages.email = 'Please enter a valid email address';
    } else {
      this.errors.email = false;
    }
  }

  onPasswordBlur() {
    if (!this.formData.password) {
      this.errors.password = true;
      this.errorMessages.password = 'Password is required';
    } else if (!this.validatePassword(this.formData.password)) {
      this.errors.password = true;
      this.errorMessages.password = 'Password must meet all requirements';
    } else {
      this.errors.password = false;
    }
    // 如果确认密码已填写，也要重新验证
    if (this.formData.confirmPassword) {
      this.onConfirmPasswordBlur();
    }
  }

  onConfirmPasswordBlur() {
    if (!this.formData.confirmPassword) {
      this.errors.confirmPassword = true;
      this.errorMessages.confirmPassword = 'Please confirm your password';
    } else if (this.formData.password !== this.formData.confirmPassword) {
      this.errors.confirmPassword = true;
      this.errorMessages.confirmPassword = 'Passwords do not match';
    } else {
      this.errors.confirmPassword = false;
    }
  }

  onTeamBlur() {
    if (!this.formData.team || this.formData.team.trim() === '') {
      this.errors.team = true;
      this.errorMessages.team = 'Team name is required';
    } else {
      this.errors.team = false;
    }
  }

  validateForm(): boolean {
    let isValid = true;
    
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
    
    // 验证密码
    if (!this.formData.password) {
      this.errors.password = true;
      this.errorMessages.password = 'Password is required';
      isValid = false;
    } else if (!this.validatePassword(this.formData.password)) {
      this.errors.password = true;
      this.errorMessages.password = 'Password must meet all requirements';
      isValid = false;
    } else {
      this.errors.password = false;
    }
    
    // 验证确认密码
    if (!this.formData.confirmPassword) {
      this.errors.confirmPassword = true;
      this.errorMessages.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (this.formData.password !== this.formData.confirmPassword) {
      this.errors.confirmPassword = true;
      this.errorMessages.confirmPassword = 'Passwords do not match';
      isValid = false;
    } else {
      this.errors.confirmPassword = false;
    }
    
    // 验证团队名称
    if (!this.formData.team || this.formData.team.trim() === '') {
      this.errors.team = true;
      this.errorMessages.team = 'Team name is required';
      isValid = false;
    } else {
      this.errors.team = false;
    }
    
    return isValid;
  }

  // 检查表单是否有效
  isFormValid(): boolean {
    return !!(this.formData.email && 
           this.formData.password && 
           this.formData.confirmPassword && 
           this.formData.team &&
           this.validateEmail(this.formData.email) &&
           this.validatePassword(this.formData.password) &&
           this.formData.password === this.formData.confirmPassword &&
           this.formData.team.trim() !== '');
  }

  onSubmit() {
    if (this.validateForm()) {
      // 设置用户信息
      this.userService.setUserInfo({
        name: this.formData.userName || this.formData.email,
        email: this.formData.email,
        team: this.formData.team,
        avatar: 'assets/default-avatar.svg'
      });
      
      console.log('Registration successful:', this.formData);
      this.router.navigate(['/congrats']);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
