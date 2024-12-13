import { Component, input, signal } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.sass'
})
export class UserCardComponent {

  constructor(private router: Router) { }

  // Creamos una variable de usuario que usaremos para mostrar los elementos de cada uno
  user = input.required<Usuario>();// con required obligamos a que el usuario sea definido para mostrar el elemento

  redirectToEditUser(username: string) {
    // Redireccionamos a la página de edición del usuario
    this.router.navigate(['editUser/' + username]);
  }
}
