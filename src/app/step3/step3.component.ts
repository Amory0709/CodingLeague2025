import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'step3',
  standalone: true,
  imports: [FormsModule, NgIf,RouterModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  @Output() nextStep = new EventEmitter<void>();

  form = {
    title: 'Mr',
    name: '',
    gender: '',
    address: '',
    age: '',
    birthday: ''
  };
  errors: any = {};

  onSubmit(event: Event) {
    event.preventDefault();
    this.errors = {};
    if (!this.form.title) this.errors.title = 'Title is required';
    if (!this.form.name) this.errors.name = 'Name is required';
    if (!this.form.gender) this.errors.gender = 'Gender is required';
    
    if (!this.errors.title && !this.errors.gender) {
      if ((this.form.title === 'Mr' && this.form.gender !== 'male') ||
          (this.form.title === 'Ms' && this.form.gender !== 'female') ||
          (this.form.title === 'Mrs' && this.form.gender !== 'female')) {
        this.errors.title = 'Title and gender do not match';
      }
    }
    if (!this.form.address) this.errors.address = 'Address is required';
    if (!this.form.age || isNaN(Number(this.form.age)) || Number(this.form.age) < 0 || Number(this.form.age) > 120) {
      this.errors.age = 'Valid age is required';
    }
    if (!this.form.birthday) {
      this.errors.birthday = 'Date of birth is required';
    }

    
    if (!this.errors.age && !this.errors.birthday) {
      const birth = new Date(this.form.birthday);
      const today = new Date();
      let realAge = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        realAge--;
      }
      if (Number(this.form.age) !== realAge) {
        this.errors.age = 'Age does not match date of birth';
      }
    }

    if (Object.keys(this.errors).length === 0) {
      this.nextStep.emit();
    } else {
      alert(Object.values(this.errors)[0]);
    }
  }

}
