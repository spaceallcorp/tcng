import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterViewInit {
  @ViewChild('promoVideo') promoVideoRef!: ElementRef<HTMLVideoElement>;

  constructor(private translate: TranslateService) {}

  ngAfterViewInit(): void {
    const video = this.promoVideoRef.nativeElement;
    
    // Ensure video plays even if autoplay is blocked
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay was prevented - show fallback or try again
        video.muted = true;
        video.play().catch(e => console.warn('Video play failed:', e));
      });
    }
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}