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
  allNoticias: any[] = [];
  currentPage = 0;
  readonly pageSize = 6;

  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) { }

  get paginatedNoticias(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.allNoticias.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.allNoticias.length / this.pageSize);
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 0;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage += 1;
    }
  }

  prevPage(): void {
    if (this.hasPreviousPage) {
      this.currentPage -= 1;
    }
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit() {
    this.noticias$.subscribe(noticias => {
      this.allNoticias = noticias ?? [];
      this.currentPage = 0;

      if (this.allNoticias.length > 0) {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.allNoticias[0].content);
      }
    });
  }
}
