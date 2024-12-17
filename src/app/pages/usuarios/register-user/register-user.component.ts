import { Component, inject, OnInit, signal } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { from, lastValueFrom } from 'rxjs';
import { UserService } from '../../../services/user-service.service';

@Component({
  selector: 'app-register-user',
  imports: [],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.sass'
})
export class RegisterUserComponent implements OnInit {

  // Variables de nuevo usuario
  newUsuario = signal<Usuario>({ nombre: '', apellidos: '', usuario: '' })
  userPass = signal<string>('')

  // Inyeccion de Servicios
  // Inyectar el servicio UserService
  userService = inject(UserService);

  // Mensajes de error 
  nombreInputError = signal<string>('')
  apellidosInputError = signal<string>('')
  userInputError = signal<string>('')
  passwordInputError = signal<string>('')
  savingUserDataError = signal<string>('')
  savingEnabled = signal<boolean>(true)
  sCreationError = signal<string>('')

  ngOnInit(): void {

  }

  // Manejo de errores de formulario
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
        this.newUsuario().nombre = newValue
        if (newValue === "") {
          this.nombreInputError.set(sErrorIndicator)
        } else {
          this.nombreInputError.set('')// Reset del error

        }
        break;

      case "apellidos":
        this.newUsuario().apellidos = newValue
        if (newValue === "") {
          this.apellidosInputError.set(sErrorIndicator)
        } else {
          this.apellidosInputError.set('')// Reset del error
        }
        break;

      case "usuario":
        this.newUsuario().usuario = newValue
        if (newValue === "") {
          this.userInputError.set(sErrorIndicator)
        } else {
          // Realizamos comprobacíon de la existencia del usuario
          //Comprobamos que el username no exista antes de enviar
          const obsUserIsTaken = from(this.isUsernameTaken(newValue));
          const bUserExist: boolean = await lastValueFrom(obsUserIsTaken);

          if (bUserExist == true) {
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

  // Peticion de creacion de usuario
  async handleCreationBtn(): Promise<void> {
    // Creamos para observar
    const observable = from(this.userService.createUsuario(this.newUsuario(), this.userPass()));

    const bRes: boolean = await lastValueFrom(observable)

    // Si falla metemos un dialog de error 
    if (!bRes) {
      this.sCreationError.set('Se ha producido un error al crear al usuario, intentalo de nuevo mas tarde.')
    } else {
      this.sCreationError.set('')
    }

  }

}
