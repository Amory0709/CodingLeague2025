import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgIf } from '@angular/common';
@Component({
  selector: 'popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Output() close = new EventEmitter<void>();
  isFullscreen = false;
  isLocked = false;

  onClose() {
    this.close.emit();
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  toggleLock() {
    this.isLocked = !this.isLocked;
  }
}
