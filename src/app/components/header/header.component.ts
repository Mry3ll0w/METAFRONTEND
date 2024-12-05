import { Component, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  //title: string = "METAFRONTEND" // No recomendado, es mejor usar un signal, mejor reaccion + ez tracking
  title = signal<string>('METAFRONTEND');
  btnLabel = signal<string>('Perfil');
  // Para comunicarnos con los hijos usaremos eventos
  showButtonClicked() {
    console.log('Button clicked!');
  }

}
