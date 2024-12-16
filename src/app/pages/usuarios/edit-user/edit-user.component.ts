import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-service.service';
import { Usuario } from '../../../models/Usuario';
import { from, lastValueFrom } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-user',
  imports: [FontAwesomeModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.sass'
})
export class EditUserComponent implements OnInit {

  // Inyectar el servicio UserService
  userService = inject(UserService);


  // Variables
  user = signal<Usuario>({ nombre: '', apellidos: '', usuario: '' });
  username = signal<string>('');
  userDataError = signal<string>('')

  // Iconos
  saveDataIcon = faSave

  constructor(private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    this.route.params.subscribe(params => {
      this.username.set(params['username']);
    });

    // Convertir la promesa a Observable
    const observable = from(this.userService.fetchUser(this.username()));

    // Usar lastValueFrom
    try {
      const requestData: { usuario: Usuario, status: number } = await lastValueFrom(observable);

      console.log(requestData.usuario.apellidos);

      if (requestData.status === 200) {
        this.user.set(requestData.usuario)
      } else {
        // set error 
        this.userDataError.set('Los datos del usuario no han sido leidos correctamente.')
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      // Manejo del error según sea necesario
    }
  }

}
