import { Component, EventEmitter, inject, Output, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // 👈 Needed for fragment detection
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Ad2Component } from '../../layout/ad2/ad2.component';
declare const UIkit: any;

@Component({
  selector: 'app-conectividade',
  imports: [
    MenuComponent,
    RodapeComponent,
    TranslatePipe,
    Ad2Component,
    RouterLink
],
  templateUrl: './conectividade.component.html',
  styleUrl: './conectividade.component.css'
})
export class ConectividadeComponent implements AfterViewInit {

  @ViewChild('servicesTabs') servicesTabs: any;
  private switcher: any;

  @Output() tabSelected = new EventEmitter<number>();

  private translate = inject(TranslateService);
  private route = inject(ActivatedRoute); // 👈 Inject Angular route

  constructor() {
    this.translate.setDefaultLang('pt');
    this.translate.use(this.translate.currentLang || 'pt');
  }

  ngAfterViewInit(): void {
    this.switcher = UIkit.switcher('.segmented-tabs') || UIkit.switcher('.timeline-content');

    this.route.fragment.subscribe(fragment => {
      if (!fragment) return;

      // Switch UIkit tab
      switch (fragment) {
        case 'internet':
          this.switchTab(0);
          break;
        case 'private-metro':
          this.switchTab(1);
          break;
        case 'ipc':
          this.switchTab(2);
          break;
        case 'acloudconnect':
          this.switchTab(3);
          break;
      }

      // Scroll to the actual target element by fragment id
      setTimeout(() => {
        const target = document.getElementById(fragment);
        if (target) {
          const headerOffset = 180;
          const elementPosition = target.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    });
  }

  switchTab(tabIndex: number) {
    if (!this.switcher) {
      this.switcher = UIkit.switcher('.segmented-tabs') || UIkit.switcher('.timeline-content');
    }
    if (this.switcher) {
      this.switcher.show(tabIndex);
    }
  }

  selectTab(tabIndex: number, event: Event) {
    event.preventDefault();
    this.tabSelected.emit(tabIndex);
    this.switchTab(tabIndex);
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
