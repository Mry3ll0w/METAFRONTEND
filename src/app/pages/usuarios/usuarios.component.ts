import { Component, inject, signal } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UserCardComponent } from './user-card/user-card.component';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-usuarios',
  imports: [UserCardComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.sass'
})
export class UsuariosComponent {

  // Creamos una lista de usuarios hardcodeados
  userService = inject(UserService)
  //! USAR HTTP CLIENT PARA CONSULTAR A LA API DE LA UBICACION


}
