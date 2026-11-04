import { Component, inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Ad2Component } from '../../layout/ad2/ad2.component';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

declare const UIkit: any;

@Component({
  selector: 'app-seguranca',
  imports: [RouterLink, Ad2Component, MenuComponent, RodapeComponent, TranslatePipe],
  templateUrl: './seguranca.component.html',
  styleUrl: './seguranca.component.css'
})
export class SegurancaComponent implements AfterViewInit {
  private switcher: any;
  private translate = inject(TranslateService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.translate.setDefaultLang('pt');
    this.translate.use(this.translate.currentLang || 'pt');
  }

  ngAfterViewInit(): void {
    this.switcher = UIkit.switcher('.segmented-tabs') || UIkit.switcher('.timeline-content');

    this.route.fragment.subscribe(fragment => {
      if (!fragment) return;

      switch (fragment) {
        case 'cleanpipe':
          this.switchTab(0);
          break;
        case 'origin-protection':
          this.switchTab(1);
          break;
        case 'app-protection':
          this.switchTab(2);
          break;
        case 'dns-protection':
          this.switchTab(3);
          break;
      }

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

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
