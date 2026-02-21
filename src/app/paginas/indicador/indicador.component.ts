import { Component,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-indicador',
  standalone: true,
  imports: [MenuComponent, RodapeComponent, TranslatePipe, ReactiveFormsModule],
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.css']
})
export class IndicadorComponent  {


  parceirosForm: FormGroup;

  selectedPartnership: string = '';

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.parceirosForm = this.createForm();
  }

 

  /**
   * Creates and returns the partnership form group.
   * @returns FormGroup
   */
  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9,15}$/)]],
      numColab: ['', [Validators.required] ],
      potCliente: ['', [Validators.required]], 

    });
  }

  /**
   * Handles form submission.
   */
  submeterForm(): void{
    if (this.parceirosForm.valid){
      console.log ('Formulário Submetido', this.parceirosForm.value);
    } else {
      console.error('Formulário inválido');
      this.markFormGroupTouched(this.parceirosForm);
    }
  }

  /**
   * Marks all controls in a form group as touched.
   * @param formGroup - The form group to touch.
   */

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Changes the application language.
   * @param language - The language code to switch to.
   */
  useLanguage(language: string): void {
    this.translate.use(language);
  }
}