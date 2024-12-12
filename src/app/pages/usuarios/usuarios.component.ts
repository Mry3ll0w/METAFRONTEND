import { Component, inject, OnInit } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { UserService } from '../../services/user-service.service';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-usuarios',
  imports: [UserCardComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.sass'
})
export class UsuariosComponent implements OnInit {

  async ngOnInit() {
    this.headerService.setShowHeaderContent(true)
    console.log('Valor de showHeaderContent:', this.headerService.showHeaderContent());

    try {

      const userData = await this.userService.fetchUsers();
      console.log('Datos recibidos:', userData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }


  // Creamos una lista de usuarios hardcodeados
  userService = inject(UserService)
  headerService = inject(HeaderService)


}
