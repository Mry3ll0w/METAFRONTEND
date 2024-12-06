import { Component, signal } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-usuarios',
  imports: [UserCardComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.sass'
})
export class UsuariosComponent {

  // Creamos una lista de usuarios hardcodeados
  lUsuarios = signal<Usuario[]>([
    { nombre: 'Antonio', apellidos: 'Hernandez', usuario: 'antonio' },
    { nombre: 'Maria', apellidos: 'Hernandez', usuario: 'maria' },
    { nombre: 'Pedro', apellidos: 'Hernandez', usuario: 'pedro' },
    { nombre: 'Luis', apellidos: 'Hernandez', usuario: 'luis' },
  ]);
  //! USAR HTTP CLIENT PARA CONSULTAR A LA API DE LA UBICACION

}
