import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'step2',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule, RouterModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  @Output() nextStep = new EventEmitter<void>();
  avatarUrl: string | ArrayBuffer | null = null;
  allInterests: string[] = [
    'Music', 'Movies', 'Sports', 'Travel', 'Reading','Select all', 'Cooking', 'Gaming', 'Art', 'Technology', 'Fitness',
    'Photography', 'Dancing','Unselect all', 'Writing', 'Fashion', 'Gardening', 'Science', 'History', 'Animals', 'Cars', 'Food'
  ];
  interests: string[] = [...this.allInterests];
  private selectAllIntervalId?: any;

  ngOnInit() {
    this.selectAllIntervalId = setInterval(() => {
      this.interests = [...this.allInterests];
    }, 8000);
  }

  ngOnDestroy() {
    if (this.selectAllIntervalId) clearInterval(this.selectAllIntervalId);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.avatarUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  downloadAvatar() {
    if (!this.avatarUrl) return;
    const a = document.createElement('a');
    a.href = typeof this.avatarUrl === 'string' ? this.avatarUrl : '';
    a.download = 'avatar.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  onInterestChange(event: Event, interest: string) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (interest === 'Select all') {
        this.interests = [...this.allInterests];
      }
      if (interest === 'Unselect all') {
        this.interests = [];
      }
      if (!this.interests.includes(interest)) {
        this.interests = [...this.interests, interest];
      }
    } else {
      this.interests = this.interests.filter(i => i !== interest);
    }
  }
  onNext() {
    if (!this.avatarUrl) {
      return;
    }
    if (this.interests.filter(i => i !== 'Select all' && i !== 'Unselect all').length !== 3) {
      return;
    }

    this.nextStep.emit();
  }
}
