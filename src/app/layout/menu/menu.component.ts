import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { ChangeDetectorRef } from '@angular/core';

declare var UIkit: any; // add at the top of your component .ts file


@Component({
  selector: 'app-menu',
  imports: [RouterLink, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

 // Close dropdowns on scroll

  private preloadFlags() {
    ['usa', 'en', 'fr'].forEach(flag => {
      new Image().src = `/img/bandeiras/${flag}.png`;
    });
  }

closeDropdowns(): void {
  // Close all dropdowns
  const openDrops = document.querySelectorAll('.uk-navbar-dropdown.uk-open');
  openDrops.forEach(drop => drop.classList.remove('uk-open'));

  // Properly hide the dropbar via UIkit
  const dropbar = document.querySelector('.uk-navbar-dropbar');
  if (dropbar) {
    dropbar.classList.remove('uk-open');
(dropbar as HTMLElement).style.height = '0px';  }

  // If you want to fully reset the component:
  const nav = document.querySelector('[uk-navbar]'); 
  if (nav) {
    const navbar = UIkit.navbar(nav);
    navbar.$emit('hide'); // force close
  }
}
  
  constructor(
    public auth: AuthService,
    private router: Router,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
    
  ) {}

  ngOnInit(): void {
    this.preloadFlags();

     // Close dropdowns on scroll
  window.addEventListener('scroll', () => {
    const openDrops = document.querySelectorAll('.uk-navbar-dropdown.uk-open');
    openDrops.forEach(drop => drop.classList.remove('uk-open'));
  });

    // Close dropdowns on click inside
  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.closest('.uk-navbar-dropdown a')) {
      this.closeDropdowns();
    }
  });
  
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/painel']);
        console.log('Usuário Autenticado');
      } else {
        console.log('Usuário Não Autenticado');
      }
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.updateLanguageDisplay(language);
  }

  onLanguageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.useLanguage(selectedValue);
  }


    selectedFlag: string = 'img/bandeiras/ao.png'; // Default flag for PT
  selectedLanguage: string = 'EN'; // Default language text
  private updateLanguageDisplay(language: string): void {
     if (language === 'en') {
    this.selectedFlag = '/img/bandeiras/usa.png';
    this.selectedLanguage = 'EN';
  } else if (language === 'fr') {
    this.selectedFlag = '/img/bandeiras/fr.png';
    this.selectedLanguage = 'FR';
  }

    this.cdr.detectChanges();
  }
  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout();
  }
}