import { NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'help',
  standalone: true,
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  imports: [NgIf, NgStyle, FormsModule]
})
export class HelpComponent {

  height = 0;
  bottom = 16;
  helpText = '';

  get floatStyle() {
    return {
      height: this.height ? (220 + this.height) + 'px' : '220px',
      bottom: this.bottom + 'px',
    };
  }

  onArrowUp() {
    if (this.bottom === -200) {
      this.height = 0;
      this.bottom = 16;
    }
    else {
      this.height += 50;
    }

  }

  onSubmit() {
    this.height = 0;
    this.bottom = -200;
  }

}
