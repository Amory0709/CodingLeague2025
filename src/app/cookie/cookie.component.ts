import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'cookie',
  standalone: true,
  templateUrl: './cookie.component.html',
  styleUrl: './cookie.component.scss'
})
export class CookieComponent {
  @Output() close = new EventEmitter<void>();

  handleClick() {
    this.close.emit();
  }
}
