import { Component } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-telcables',
  imports: [TranslatePipe],
  templateUrl: './telcables.component.html',
  styleUrl: './telcables.component.css'
})
export class TelcablesComponent {

  
    constructor (private translate: TranslateService) {}
    useLanguage(language: string): void {
      this.translate.use(language);
  }

}
