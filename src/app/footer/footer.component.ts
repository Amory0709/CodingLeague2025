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
    phone: '+1 (555) 123-4567'
  };
  
  // 快速链接
  quickLinks = [
    { label: 'Home', route: '/' },
    { label: 'Register', route: '/register' },
    { label: 'Contact Us', route: '/contact' }
  ];
}
