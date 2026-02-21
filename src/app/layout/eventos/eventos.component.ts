import { Component, inject, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { TranslatePipe,  TranslateService } from '@ngx-translate/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-eventos',
  imports: [AsyncPipe, CommonModule, TranslatePipe, RouterLink],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit {


  safeContent: SafeHtml = '';
  private eventoService = inject(EventoService);
  eventos$ = this.eventoService.getEventos();

  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) { }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit() {
    this.eventos$.subscribe(eventos => {
      if (eventos.length > 0) {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(eventos[0].content);
      }
    });
  }
}
