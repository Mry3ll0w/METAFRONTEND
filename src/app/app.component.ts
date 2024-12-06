import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'metafrontend';
}
