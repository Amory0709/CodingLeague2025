import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  // 联系信息
  contactInfo = {
    email: 'contact@codingleague.com',
    phone: '+1 (555) 123-4567',
    address: '123 Coding Street, Tech City, TC 12345'
  };
  
  // 快速链接
  quickLinks = [
    { label: 'Home', route: '/' },
    { label: 'Register', route: '/register' },
    { label: 'Contact Us', route: '/contact' }
  ];
  
  // 社交媒体链接
  socialLinks = [
    { label: 'Twitter', url: 'https://twitter.com/codingleague', icon: '🐦' },
    { label: 'LinkedIn', url: 'https://linkedin.com/company/codingleague', icon: '💼' },
    { label: 'GitHub', url: 'https://github.com/codingleague', icon: '📚' }
  ];
}
