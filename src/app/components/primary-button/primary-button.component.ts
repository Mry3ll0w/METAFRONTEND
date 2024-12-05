import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  template: `
    <button class="px-4 py-1 text-sm text-black-600 font-semibold 
      rounded-full border border-purple-200 border-solid
    hover:text-white hover:bg-orange-500 
      hover:border-transparent focus:outline-none focus:ring-2 
    focus:ring-green-600 focus:ring-offset-1"
      (click)="handleButtonClick.emit()"
    >
      {{label()}}
    </button>
  `,
  styleUrl: './primary-button.component.sass'
})
export class PrimaryButtonComponent {

  //Marcamos con signal inputs
  label = input<string>('')

  handleButtonClick = output() // Pasar valores del hijo al padre 


}
