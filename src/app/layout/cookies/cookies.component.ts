import { Component, inject, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink } from '@angular/router';

export interface CookiePreferences {
  essenciais: boolean;
  analiticos: boolean;
  marketing: boolean;
  timestamp?: string;
}

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [CookieService],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css'
})
export class CookiesComponent implements OnInit {
  public cookieService = inject(CookieService);

  mostrarBanner = signal(false);
  mostrarModalAjustes = signal(false);
  consentGiven = signal(false);

  // User preferences
  prefs: CookiePreferences = {
    essenciais: true, // Always true and locked
    analiticos: false,
    marketing: false
  };

  ngOnInit(): void {
    if (this.cookieService.check('cookie-consent')) {
      try {
        const saved = JSON.parse(this.cookieService.get('cookie-consent'));
        if (saved && typeof saved === 'object') {
          this.prefs = {
            essenciais: true,
            analiticos: !!saved.analiticos,
            marketing: !!saved.marketing,
            timestamp: saved.timestamp
          };
          this.consentGiven.set(true);
        }
      } catch {
        this.mostrarBanner.set(true);
      }
    } else {
      this.mostrarBanner.set(true);
    }
  }

  @HostListener('window:open-cookie-settings')
  onOpenSettings(): void {
    this.abrirAjustes();
  }

  aceitarTudo(): void {
    this.prefs.analiticos = true;
    this.prefs.marketing = true;
    this.salvarPreferencias();
  }

  rejeitarTudo(): void {
    this.prefs.analiticos = false;
    this.prefs.marketing = false;
    this.salvarPreferencias();
  }

  abrirAjustes(): void {
    this.mostrarModalAjustes.set(true);
  }

  fecharAjustes(): void {
    this.mostrarModalAjustes.set(false);
  }

  salvarPreferencias(): void {
    const consentObj: CookiePreferences = {
      essenciais: true,
      analiticos: this.prefs.analiticos,
      marketing: this.prefs.marketing,
      timestamp: new Date().toISOString()
    };

    this.cookieService.set('cookie-consent', JSON.stringify(consentObj), {
      expires: 365,
      path: '/',
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:'
    });

    this.consentGiven.set(true);
    this.mostrarBanner.set(false);
    this.mostrarModalAjustes.set(false);

    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: consentObj }));
  }
}
