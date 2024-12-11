import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { UserService } from '../../services/user-service.service';
import { Usuario } from '../../models/Usuario';
@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  //title: string = "METAFRONTEND" // No recomendado, es mejor usar un signal, mejor reaccion + ez tracking
  title = signal<string>('METAFRONTEND');
  btnLabel = signal<string>('Agregar Usuario');
  // Para comunicarnos con los hijos usaremos eventos
  userService = inject(UserService)
  showButtonClicked() {
    // Call create service
    var testUser: Usuario = { nombre: 'Antonio', apellidos: 'Hernandez', usuario: 'antonio' };
    this.userService.addToUsers(testUser);
  }

}
