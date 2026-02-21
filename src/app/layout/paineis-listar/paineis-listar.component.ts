import { Component, inject, OnInit } from '@angular/core';
import { PainelService } from '../../services/painel.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';




@Component({
  selector: 'app-paineis-listar',
  imports: [

        AsyncPipe,
    CommonModule,



  ],
  templateUrl: './paineis-listar.component.html',
  styleUrl: './paineis-listar.component.css'
})
export class PaineisListarComponent implements OnInit {


  safeContent: SafeHtml = '';
  private painelService = inject(PainelService);
  paineis$ = this.painelService.getPaineis();

  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) { }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit() {
    this.paineis$.subscribe(paineis => {
      if (paineis.length > 0) {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(paineis[0].content);
      }
    });
  }
}
