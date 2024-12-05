import { Component, input } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `
    <button >
      {{label()}}
    </button>
  `,
  styleUrl: './primary-button.component.sass'
})
export class PrimaryButtonComponent {

  //Marcamos con signal inputs
  label = input<string>('')

}
