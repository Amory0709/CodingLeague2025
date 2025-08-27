import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'interests',
  standalone: true,
  imports: [FormsModule, RouterModule, NgFor, NgIf],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent {
  @Output() nextStep = new EventEmitter<string[]>();
  
  interests: string[] = [];
  
  allInterests = [
    { name: 'Technology', icon: '💻' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Music', icon: '🎵' },
    { name: 'Reading', icon: '📚' },
    { name: 'Travel', icon: '✈️' },
    { name: 'Cooking', icon: '👨‍🍳' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Photography', icon: '📷' },
    { name: 'Art', icon: '🎨' },
    { name: 'Fitness', icon: '💪' },
    { name: 'Movies', icon: '🎬' },
    { name: 'Nature', icon: '🌲' }
  ];

  onInterestChange(event: any, interest: string) {
    if (event.target.checked) {
      this.interests.push(interest);
    } else {
      const index = this.interests.indexOf(interest);
      if (index > -1) {
        this.interests.splice(index, 1);
      }
    }
  }

  selectAll() {
    this.interests = this.allInterests.map(item => item.name);
  }

  unselectAll() {
    this.interests = [];
  }

  onNext() {
    if (this.interests.length >= 3) {
      this.nextStep.emit(this.interests);
    }
  }

  get selectedCount() {
    return this.interests.length;
  }

  get isNextDisabled() {
    return this.interests.length < 3;
  }
}
