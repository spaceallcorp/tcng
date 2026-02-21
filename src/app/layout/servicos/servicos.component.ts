
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-servicos',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent {

  
    

      useLanguage(language: string): void {
        this.translate.use(language);
    }
    
    constructor(private translate: TranslateService) {}
    

}
