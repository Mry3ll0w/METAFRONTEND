import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UserCardComponent } from './user-card/user-card.component';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-usuarios',
  imports: [UserCardComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.sass'
})
export class UsuariosComponent implements OnInit {

  async ngOnInit() {
    try {
      const userData = await this.userService.fetchUsers();
      //console.log('Datos recibidos:', userData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  // Creamos una lista de usuarios hardcodeados
  userService = inject(UserService)
  //! USAR HTTP CLIENT PARA CONSULTAR A LA API DE LA UBICACION


}
