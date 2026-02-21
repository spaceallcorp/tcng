import { Component, inject, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import {  TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-painel-listar-evento',
  imports: [ AsyncPipe, CommonModule],
  templateUrl: './painel-listar-evento.component.html',
  styleUrl: './painel-listar-evento.component.css'
})
export class PainelListarEventoComponent implements OnInit {


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


 async onDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await this.eventoService.deleteEvento(id);
        console.log('✅ Evento deletado com sucesso');
      } catch (err) {
        console.error('❌ Erro ao deletar evento:', err);
      }
    }
  }

}
