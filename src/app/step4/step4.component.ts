import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'step4',
  standalone: true,
  imports: [NgForOf, FormsModule, RouterModule],
  templateUrl: './step4.component.html',
  styleUrl: './step4.component.scss'
})
export class Step4Component implements AfterViewInit {
  @ViewChild('gallery') galleryRef!: ElementRef<HTMLDivElement>;
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.galleryRef?.nativeElement) {
        this.galleryRef.nativeElement.scrollTop = this.galleryRef.nativeElement.scrollHeight;
      }
    });
  }
  @Output() nextStep = new EventEmitter<void>();
  images = Array.from({length: 16}, (_, i) => `/assets/step4/light${i}.jpg`);
  selected: boolean[] = Array(16).fill(false);

  onSubmit() {
    const allSelected = this.selected.every(v => v);
    if (allSelected) {
      this.nextStep.emit();
    } else {
      this.selected = Array(16).fill(false);
      this.shuffleImages();
    }
  }

  shuffleImages() {
    for (let i = this.images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.images[i], this.images[j]] = [this.images[j], this.images[i]];
    }
  }
}
