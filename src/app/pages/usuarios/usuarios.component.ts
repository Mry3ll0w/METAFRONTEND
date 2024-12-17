import { Component, inject, OnInit, signal } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { UserService } from '../../services/user-service.service';
import { HeaderService } from '../../services/header.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-usuarios',
  imports: [UserCardComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.sass'
})
export class UsuariosComponent implements OnInit {

  lUsers = signal<Usuario[]>([])

  async ngOnInit() {
    this.headerService.setShowHeaderContent(true)
    console.log('Valor de showHeaderContent:', this.headerService.showHeaderContent());

    try {

      const userData = await this.userService.fetchUsers();

    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }


  // Creamos una lista de usuarios hardcodeados
  userService = inject(UserService)
  headerService = inject(HeaderService)

  async handleUserFiltering(pattern: string): Promise<void> {

    await this.userService.filterFetchedUsersByPattern(pattern)

  }


}
