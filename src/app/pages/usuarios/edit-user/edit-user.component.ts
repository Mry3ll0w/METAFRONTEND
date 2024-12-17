import { Component, signal, OnInit, inject, WritableSignal } from '@angular/core';
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
  savingEnabled = signal<boolean>(false)
  userPass = signal<string>('')
  //oldUserName = signal<string>('')// Por si cambia el valor de usuario

  // Iconos
  saveDataIcon = faSave

  // Mensajes de error 
  nombreInputError = signal<string>('')
  apellidosInputError = signal<string>('')
  userInputError = signal<string>('')
  passwordInputError = signal<string>('')
  savingUserDataError = signal<string>('')
  buttonLabel = signal<string>('Guardar Cambios')

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


  //Comprobamos si existe el usuario
  async isUsernameTaken(newUsername: string): Promise<boolean> {

    // Convertir la promesa a Observable
    const observable = from(this.userService.fetchUser(newUsername));

    // Usar lastValueFrom
    try {
      const requestData: { usuario: Usuario, status: number } = await lastValueFrom(observable);

      console.log(requestData.usuario.apellidos);

      return requestData.status === 200;

    } catch (error) {

      console.error('Error al obtener los datos del usuario:', error);
      this.savingUserDataError.set('Error al actualizar datos')
      // Manejo del error según sea necesario
      return true;
    }

  }

  async handleInputChange(newValue: string, field: string): Promise<void> {

    var sErrorIndicator: string = `El campo ${field} no puede estar vacio`

    switch (field) {
      case "nombre":
        this.user().nombre = newValue
        if (newValue === "") {
          this.nombreInputError.set(sErrorIndicator)
        } else {
          this.nombreInputError.set('')// Reset del error
        }
        break;

      case "apellidos":
        this.user().apellidos = newValue
        if (newValue === "") {
          this.apellidosInputError.set(sErrorIndicator)
        } else {
          this.apellidosInputError.set('')// Reset del error
        }
        break;

      case "usuario":
        this.user().usuario = newValue
        if (newValue === "") {
          this.userInputError.set(sErrorIndicator)
        } else {
          // Realizamos comprobacíon de la existencia del usuario
          //Comprobamos que el username no exista antes de enviar
          const obsUserIsTaken = from(this.isUsernameTaken(this.user().usuario));
          const bUserExist: boolean = await lastValueFrom(obsUserIsTaken);

          if (bUserExist == true && this.username() != this.user().usuario) {
            this.userInputError.set('Este usuario ya existe')
          } else {
            this.userInputError.set('')
          }

        }
        break

      case "password":
        this.userPass.set(newValue)
        if (newValue === "") {
          this.apellidosInputError.set(sErrorIndicator)
        } else {
          this.apellidosInputError.set('')// Reset del error
        }
        break

      default:
        break;
    }

    if (
      this.nombreInputError() === '' && this.passwordInputError() === ''
      && this.apellidosInputError() === '' && this.userInputError() === ''
      && this.passwordInputError() === ''
    ) {
      // Si todos estan vacios podemos hacer update
      this.savingEnabled.set(true)
    } else {
      this.savingEnabled.set(false)
    }

  }

  async updateUserData(): Promise<void> {

    // Comprobamos los elementos estan correctos para saver si podemos actualizarlos
    //! Implement
    if (
      this.nombreInputError() === '' && this.passwordInputError() === ''
      && this.apellidosInputError() === '' && this.userInputError() === ''
      && this.passwordInputError() === ''
    ) {
      // Si todos estan vacios podemos hacer update
      this.savingEnabled.set(true)
    } else {
      this.savingEnabled.set(false)
    }

    if (this.savingEnabled()) {
      this.buttonLabel.set('Guardar cambios')
      this.userService.updateUsuarioValues(this.username(), this.user(), this.userPass())
    } else {
      this.buttonLabel.set('Corrige los errores indicados')
    }


  }

}
