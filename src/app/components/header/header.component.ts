import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  //title: string = "METAFRONTEND" // No recomendado, es mejor usar un signal, mejor reaccion + ez tracking
  title = signal<string>('METAFRONTEND');

}
