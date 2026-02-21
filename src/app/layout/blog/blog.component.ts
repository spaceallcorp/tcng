import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [
    AsyncPipe,
    CommonModule,
    DatePipe,
    TranslatePipe,
    RouterLink
],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {


  
  safeContent: SafeHtml = '';
  private blogService = inject(BlogService);
  posts$ = this.blogService.getPosts();



  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer


  ) { }
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
