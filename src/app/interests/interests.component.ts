import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [RouterModule, HeaderComponent, NgFor, NgIf],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent {
  isLoggedIn = true;
  userInfo = {
    name: 'User',
    avatar: 'assets/default-avatar.svg'
  };
  
  selectedInterests: string[] = [];
  
  // 分类的兴趣选项
  interestCategories = [
    {
      name: 'Sports & Fitness',
      interests: [
        { id: 'football', name: 'Football', icon: '⚽', color: '#ff6b6b' },
        { id: 'basketball', name: 'Basketball', icon: '🏀', color: '#ffa726' },
        { id: 'tennis', name: 'Tennis', icon: '🎾', color: '#66bb6a' },
        { id: 'swimming', name: 'Swimming', icon: '🏊', color: '#42a5f5' },
        { id: 'gym', name: 'Gym', icon: '💪', color: '#ab47bc' },
        { id: 'yoga', name: 'Yoga', icon: '🧘', color: '#26a69a' }
      ]
    },
    {
      name: 'Technology',
      interests: [
        { id: 'programming', name: 'Programming', icon: '💻', color: '#2196f3' },
        { id: 'ai', name: 'AI & ML', icon: '🤖', color: '#9c27b0' },
        { id: 'gaming', name: 'Gaming', icon: '🎮', color: '#ff5722' },
        { id: 'mobile', name: 'Mobile Apps', icon: '📱', color: '#4caf50' },
        { id: 'web', name: 'Web Development', icon: '🌐', color: '#ff9800' },
        { id: 'data', name: 'Data Science', icon: '📊', color: '#795548' }
      ]
    },
    {
      name: 'Creative Arts',
      interests: [
        { id: 'music', name: 'Music', icon: '🎵', color: '#e91e63' },
        { id: 'art', name: 'Art', icon: '🎨', color: '#ff5722' },
        { id: 'photography', name: 'Photography', icon: '📷', color: '#607d8b' },
        { id: 'writing', name: 'Writing', icon: '✍️', color: '#795548' },
        { id: 'design', name: 'Design', icon: '🎨', color: '#9c27b0' },
        { id: 'crafts', name: 'Crafts', icon: '🧶', color: '#ff9800' }
      ]
    },
    {
      name: 'Lifestyle',
      interests: [
        { id: 'cooking', name: 'Cooking', icon: '👨‍🍳', color: '#ff5722' },
        { id: 'travel', name: 'Travel', icon: '✈️', color: '#2196f3' },
        { id: 'reading', name: 'Reading', icon: '📚', color: '#795548' },
        { id: 'movies', name: 'Movies', icon: '🎬', color: '#9c27b0' },
        { id: 'nature', name: 'Nature', icon: '🌲', color: '#4caf50' },
        { id: 'pets', name: 'Pets', icon: '🐕', color: '#ff9800' }
      ]
    }
  ];

  constructor(private router: Router) {}

  toggleInterest(interestId: string) {
    const index = this.selectedInterests.indexOf(interestId);
    if (index > -1) {
      this.selectedInterests.splice(index, 1);
    } else {
      this.selectedInterests.push(interestId);
    }
  }

  isSelected(interestId: string): boolean {
    return this.selectedInterests.includes(interestId);
  }

  onSkip() {
    this.router.navigate(['/home2']);
  }

  onComplete() {
    console.log('Selected interests:', this.selectedInterests);
    this.router.navigate(['/home2']);
  }

  get selectedCount() {
    return this.selectedInterests.length;
  }
}
