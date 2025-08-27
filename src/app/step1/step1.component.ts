import { NgIf } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'step1',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component {
  @Output() nextStep = new EventEmitter<string[]>();
  formData = {
    email: '',
    domain: '',
    password: '',
    confirmPassword: '',
    team: '',
    terms: true
  };
  termsError = false;
  passwordError = false;
  confirmPasswordError = false;
  emailError = false;
  domainError = false;
  teamError = false;

  resetForm() {
    this.formData = {
      email: '',
      domain: '',
      password: '',
      confirmPassword: '',
      team: '',
      terms: true
    };
    this.resetErrors();
  }

  resetErrors() {
    this.termsError = false;
    this.passwordError = false;
    this.confirmPasswordError = false;
    this.emailError = false;
    this.domainError = false;
    this.teamError = false;
  }

  validateForm() {
    this.resetErrors();
    let isValid = true;

    // Terms validation
    if (this.formData.terms) {
      this.termsError = true;
      isValid = false;
    }

    // Email validation
    if (!this.formData.email || !/^[a-zA-Z0-9_-]+$/.test(this.formData.email)) {
      this.emailError = true;
      isValid = false;
    }

    // Domain validation
    if (!this.formData.domain || !/^[a-zA-Z0-9.-]+$/.test(this.formData.domain)) {
      this.domainError = true;
      isValid = false;
    }

    // Team name validation
    if (!this.formData.team || this.formData.team.trim() === '') {
      this.teamError = true;
      isValid = false;
    }

    // Password validation
    const password = this.formData.password;
    if (password.length < 10 || 
        !/[A-Z]/.test(password) || 
        !/[0-9]/.test(password) || 
        !/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(password)) {
      this.passwordError = true;
      isValid = false;
    }

    // Confirm password validation
    if (password !== this.formData.confirmPassword) {
      this.confirmPasswordError = true;
      isValid = false;
    }

    if (isValid) {
      this.nextStep.emit([this.formData.email, this.formData.team]);
    }
  }
}
