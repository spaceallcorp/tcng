import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { ContadorComponent } from '../contador/contador.component';
import { CaracteristicasComponent } from "../caracteristicas/caracteristicas.component";
import { ParceirosComponent } from '../parceiros/parceiros.component';
import { EventosAcComponent } from '../../paginas/eventos-ac/eventos-ac.component';
import { EventosListarComponent } from '../eventos-listar/eventos-listar.component';
import { Ad2Component } from '../ad2/ad2.component';
import { ArtigoListaComponent } from '../artigo-lista/artigo-lista.component';
import { EventosComponent } from '../eventos/eventos.component';
import { BlogComponent } from '../blog/blog.component';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { NoticiasListarComponent } from "../noticias-listar/noticias-listar.component";
import { CertificacoesComponent } from '../certificacoes/certificacoes.component';

declare const UIkit: any; // To access UIkit globally

@Component({
  selector: 'app-angolacables',
  standalone: true,
  imports: [EventosAcComponent, CertificacoesComponent, SlideshowComponent, BlogComponent, EventosComponent, Ad2Component, ArtigoListaComponent, EventosListarComponent, ParceirosComponent, TranslatePipe, RouterLink, ContadorComponent, CaracteristicasComponent, NoticiasListarComponent],
  templateUrl: './angolacables.component.html',
  styleUrl: './angolacables.component.css'
})
export class AngolacablesComponent implements AfterViewInit {

  constructor(private translate: TranslateService) {}

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngAfterViewInit(): void {
    const modal = UIkit.modal('#modal-video');

    const video: HTMLVideoElement | null = document.getElementById('promoVideo') as HTMLVideoElement;

    if (modal && video) {
      document.getElementById('modal-video')?.addEventListener('hidden', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  }
}
