import { Component, inject, OnInit, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-login',
  imports: [PrimaryButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit {

  // Servicios
  authService = inject(AuthService)
  headerService = inject(HeaderService)

  // Variables
  username = signal<string>('');
  password = signal<string>('');

  // CTOR
  constructor(private router: Router) { }

  // Funcion para hacer Login
  handleLogin() {

    // Mostramos por consola el valor de username y password
    console.log("username: ", this.username());
    console.log("password: ", this.password());



    this.authService.getLogInToken(this.username(), this.password())
      .then((res) => {

        if (res.success) {
          this.authService.setSessionToken(res.token ?? '');
          // Redireccionamos a la pagina principal
          this.headerService.setShowHeaderContent(true);
          console.log("Valor de show " + this.headerService.showHeaderContent());
          this.router.navigate(['/']);

        } else {
          // Mostramos modal de error de login y borramos el token
          this.authService.eraseSessionToken();
          // Mostramos modal de error de login

        }
      })
      ;


  }

  handleUserNameChange(input: string) {
    this.username.set(input);
  }

  handlePasswordChange(input: string) {
    this.password.set(input);
  }

  ngOnInit(): void {
    // Primero comprobamos que no exista una session

    if (this.authService.getSessionToken().toString() == '') {
      // Limpiamos la session 
      this.username.set('');
      this.password.set('');
    }
    else {// Ya esta logg, lo mandamos a /
      this.router.navigate(['/'], {
        queryParams: {}, // Optional query parameters
      });
    }

    // Avisamos al servicio que oculte el header
    this.headerService.setShowHeaderContent(false);

  }



}
