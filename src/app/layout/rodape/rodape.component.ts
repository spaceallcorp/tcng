import { Component } from '@angular/core';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rodape',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.css'
})
export class RodapeComponent {

      useLanguage(language: string): void {
          this.translate.use(language);
      }
      
      constructor(private translate: TranslateService) {}
      

}
