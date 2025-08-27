import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  isExpanded = false;

  onArrowUp() {
    this.isExpanded = !this.isExpanded;
  }

  onSubmit() {
    // 快速联系功能
    console.log('Quick contact submitted');
    alert('Thank you for your quick message! We will get back to you soon.');
  }
}
