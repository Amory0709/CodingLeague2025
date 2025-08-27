import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
})
export class CookieConsentComponent implements OnInit {
  showConsent = false;

  ngOnInit() {
    // 每次刷新都显示Cookie弹窗
    setTimeout(() => {
      this.showConsent = true;
    }, 500);
  }

  acceptCookies() {
    sessionStorage.setItem('cookieConsent', 'accepted');
    this.showConsent = false;
    console.log('Cookies accepted');
  }

  declineCookies() {
    sessionStorage.setItem('cookieConsent', 'declined');
    this.showConsent = false;
    console.log('Cookies declined');
  }

  // 检查Cookie同意状态
  static hasConsented(): boolean {
    return sessionStorage.getItem('cookieConsent') === 'accepted';
  }
}
