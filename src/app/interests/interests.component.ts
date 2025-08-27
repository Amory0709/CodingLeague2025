import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { CanComponentDeactivate } from '../guards/can-deactivate.guard';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [RouterModule, HeaderComponent, NgFor, NgIf],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent implements CanComponentDeactivate {
  selectedInterests: string[] = [];
  allInterestIds: string[] = [];
  
  // 用于跟踪是否正在导航（绕过guard）
  isNavigating = false;
  
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

  constructor(private router: Router) {
    // 收集所有兴趣ID
    this.interestCategories.forEach(category => {
      category.interests.forEach(interest => {
        this.allInterestIds.push(interest.id);
      });
    });
  }

  // 实现 CanComponentDeactivate 接口
  canDeactivate(): boolean {
    if (this.isNavigating) {
      // 如果正在导航，允许导航
      return true;
    }
    
    if (this.selectedInterests.length > 0) {
      return confirm('You have selected interests. Are you sure you want to go back and lose your selections?');
    }
    return true;
  }

  goBack() {
    // 如果有选择的兴趣，显示确认对话框
    if (this.selectedInterests.length > 0) {
      const confirmed = confirm('You have selected interests. Are you sure you want to go back and lose your selections?');
      if (!confirmed) {
        return;
      }
    }
    
    // 设置导航状态，绕过guard
    this.isNavigating = true;
    this.router.navigate(['/profile']);
  }

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

  selectAll() {
    this.selectedInterests = [...this.allInterestIds];
  }

  unselectAll() {
    this.selectedInterests = [];
  }

  onSkip() {
    // 设置导航状态，绕过guard
    this.isNavigating = true;
    this.router.navigate(['/home2']);
  }

  onStartExploring() {
    console.log('Selected interests:', this.selectedInterests);
    // 设置导航状态，绕过guard
    this.isNavigating = true;
    this.router.navigate(['/home2']);
  }

  get selectedCount() {
    return this.selectedInterests.length;
  }

  canProceed() {
    return this.selectedInterests.length >= 3;
  }
}