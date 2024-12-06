import { Component, input, signal } from '@angular/core';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.sass'
})
export class UserCardComponent {

  // Creamos una variable de usuario que usaremos para mostrar los elementos de cada uno
  user = input.required<Usuario>();// con required obligamos a que el usuario sea definido para mostrar el elemento

}
