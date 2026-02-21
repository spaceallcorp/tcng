import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { TruncatePipe } from '../../pipes/truncate.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artigo-lista',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    DatePipe,
    TranslatePipe,
    TruncatePipe,
    RouterLink
],
  templateUrl: './artigo-lista.component.html',
  styleUrl: './artigo-lista.component.css'
})
export class ArtigoListaComponent implements OnInit {

  safeContent: SafeHtml = '';
  private blogService = inject(BlogService);
  posts$ = this.blogService.getPosts();

  constructor(
    private translate: TranslateService, // Já está aqui
    private sanitizer: DomSanitizer
  ) {
    this.translate.setDefaultLang('pt'); // Inserido
    this.translate.use(this.translate.currentLang || 'pt'); // Inserido
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit() {
    this.posts$.subscribe(posts => {
      if (posts.length > 0) {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(posts[0].content);
      }
    });
  }
}