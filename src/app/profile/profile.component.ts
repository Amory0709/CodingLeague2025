import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf, NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Output() nextStep = new EventEmitter<any>();
  
  avatarUrl: string | null = null;
  form = {
    title: '',
    name: '',
    gender: '',
    address: ''
  };

  defaultAvatars = [
    'assets/default-avatar.svg',
    'assets/default-avatar.svg', 
    'assets/default-avatar.svg'
  ];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  selectDefaultAvatar(avatarPath: string) {
    this.avatarUrl = avatarPath;
  }

  onNext() {
    // 验证表单
    if (this.form.name && this.form.title) {
      const profileData = {
        ...this.form,
        avatar: this.avatarUrl
      };
      this.nextStep.emit(profileData);
    }
  }
}
