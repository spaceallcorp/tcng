import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

import { BlogService } from '../../services/blog.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MenuComponent } from '../menu/menu.component';
import { RodapeComponent } from "../rodape/rodape.component";
import { Subscription } from 'rxjs';

import { TranslateService, TranslatePipe } from '@ngx-translate/core'; // Inserido

@Component({
  selector: 'app-artigo',
  standalone: true,
  imports: [RouterLink, DatePipe, TruncatePipe, CommonModule, MenuComponent, RodapeComponent, TranslatePipe], // Inserido
  templateUrl: './artigo.component.html',
  styleUrl: './artigo.component.css',
})
export class ArtigoComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private sanitizer = inject(DomSanitizer);
  private translate = inject(TranslateService); // Inserido

  post: any;
  safeContent: SafeHtml = '';
  posts$ = this.blogService.getPosts();

  private routeSub: Subscription | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = params['id'];
      if (postId) {
        this.loadPostById(postId);
      }
    });

    this.translate.setDefaultLang('pt'); // Inserido
    this.translate.use(this.translate.currentLang || 'pt'); // Inserido
  }

  loadPostById(postId: string): void {
    this.blogService.getPostById(postId).subscribe((data) => {
      this.post = data;
      if (this.post?.content) {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.post.content);
      }
    });
  }

  useLanguage(language: string): void { // Inserido
    this.translate.use(language); // Inserido
  } // Inserido

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}