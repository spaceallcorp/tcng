import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { NoticiaService } from '../../services/noticia.service';


import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-noticias',
  imports: [TranslatePipe, MenuComponent, RodapeComponent, DatePipe, AsyncPipe, CommonModule, TruncatePipe],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent implements OnInit {


  safeContent: SafeHtml = '';
  private noticiaService = inject(NoticiaService);

  noticias$ = this.noticiaService.getNoticias();

  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) { }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit() {
    this.noticias$.subscribe(noticias => {
      if (noticias.length > 0) {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(noticias[0].content);
      }
    });
  }

}
