import { Component, inject, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-noticias-listar',
  imports: [
    AsyncPipe,
    CommonModule,
    DatePipe,
    TruncatePipe,
    TranslatePipe,
    RouterLink
],
  templateUrl: './noticias-listar.component.html',
  styleUrl: './noticias-listar.component.css'
})
export class NoticiasListarComponent implements OnInit {


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
