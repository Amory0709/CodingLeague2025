import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf,NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
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
  imports: [CommonModule,FormsModule, RouterModule, HeaderComponent, NgIf, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements CanComponentDeactivate, OnInit {
  isLoggedIn = false;
  userInfo = null;
  showPasswordRules = false;
  showPassword = false;
  showConfirmPassword = false;

  formData = {
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    team: ''
  };

  acceptedTerms = false; // 新增：隐私条款勾选状态
  showTermsModal = false; // 控制浮窗显示

  errors = {
    email: false,
    password: false,
    confirmPassword: false,
    team: false,
    userName: false // 新增 userName 错误标志
  };

  errorMessages = {
    email: '',
    password: '',
    confirmPassword: '',
    team: '',
    userName: '' // 新增 userName 错误信息
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
      text: 'At least 1 special character (!@#$%^&*()_-+=)',
      validator: (password: string) => /[!@#$%^&*()_+=]/.test(password),
      isCompleted: false
    }
  ];
  // 验证码相关
  captchaDescription = '';
  captchaImages: { url: string, isAnswer: boolean }[] = [];
  captchaSelectedIndexes: number[] = [];
  captchaPassed = false;
  captchaError = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  // 检查表单是否有未保存的更改
  hasFormData(): boolean {
    // 如果表单已经完整且有效，则不需要提示未保存更改
    if (this.isFormValid()) {
      return false;
    }

    // 检查是否有任何数据输入
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
      this.errorMessages.email = 'Please enter a valid email address, e.g., name@example.com';
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

  onUserNameBlur() {
    if (!this.formData.userName || this.formData.userName.trim() === '') {
      this.errors.userName = true;
      this.errorMessages.userName = 'User name is required';
    } else {
      this.errors.userName = false;
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
      this.errorMessages.email = 'Please enter a valid email address, e.g., name@example.com';
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

    // 验证用户名
    if (!this.formData.userName || this.formData.userName.trim() === '') {
      this.errors.userName = true;
      this.errorMessages.userName = 'User name is required';
      isValid = false;
    } else {
      this.errors.userName = false;
    }

    return isValid;
  }

  ngOnInit() {
    this.generateCaptcha();
  }

  generateCaptcha() {
    // 使用 assets/verification 下的 6 张图片
    this.captchaDescription = 'Select all images with a cat';
    this.captchaImages = [
      { url: '../../assets/verification/cat1.png', isAnswer: true },
      { url: '../../assets/verification/cat2.png', isAnswer: true },
      { url: '../../assets/verification/cat3.png', isAnswer: true },
      { url: '../../assets/verification/2.png', isAnswer: false },
      { url: '../../assets/verification/3.png', isAnswer: false },
      { url: '../../assets/verification/5.png', isAnswer: false }
    ].sort(() => Math.random() - 0.5); // 打乱顺序
    this.captchaSelectedIndexes = [];
    this.captchaPassed = false;
    this.captchaError = false;
  }

  onCaptchaImageClick(idx: number) {
    if (this.captchaPassed) return;
    const i = this.captchaSelectedIndexes.indexOf(idx);
    if (i >= 0) {
      this.captchaSelectedIndexes.splice(i, 1);
    } else {
      this.captchaSelectedIndexes.push(idx);
    }
  }

  submitCaptcha() {
    // cat1, cat2, cat3 为正确答案
    const correctIndexes = this.captchaImages
      .map((img, idx) => img.isAnswer ? idx : -1)
      .filter(idx => idx !== -1);
    if (
      this.captchaSelectedIndexes.length === correctIndexes.length &&
      this.captchaSelectedIndexes.every(idx => correctIndexes.includes(idx)) &&
      correctIndexes.every(idx => this.captchaSelectedIndexes.includes(idx))
    ) {
      this.captchaPassed = true;
      this.captchaError = false;
    } else {
      this.captchaPassed = false;
      this.captchaError = true;
      this.generateCaptcha();
    }
  }

  // 检查表单是否有效
  isFormValid(): boolean {
    return !!(this.formData.email &&
           this.formData.password &&
           this.formData.confirmPassword &&
           this.formData.team &&
           this.formData.userName &&
           this.validateEmail(this.formData.email) &&
           this.validatePassword(this.formData.password) &&
           this.formData.password === this.formData.confirmPassword &&
           this.formData.team.trim() !== '' &&
           this.formData.userName.trim() !== '' &&
           this.acceptedTerms &&
           this.captchaPassed // 新增：验证码必须通过
    );
  }

  onSubmit() {
    if (this.validateForm()) {
      // 设置用户信息
      this.userService.setUserInfo({
        name: this.formData.userName, // 始终使用 userName
        email: this.formData.email,
        team: this.formData.team,
        avatar: 'assets/default-avatar.svg'
      });

      console.log('Registration successful:', this.formData);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  // 切换密码可见性
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // 切换确认密码可见性
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;}
  openTermsModal(event: Event) {
    event.preventDefault();
    this.showTermsModal = true;
  }

  closeTermsModal() {
    this.showTermsModal = false;
  }

  onAgreeTerms() {
    this.acceptedTerms = true;
    this.showTermsModal = false;
  }
}
