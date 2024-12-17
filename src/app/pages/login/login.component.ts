import { Component, inject, OnInit, output, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  imports: [FontAwesomeModule],
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
  error = signal<string>('')

  // Iconos
  faRightBracket = faRightFromBracket

  // CTOR
  constructor(private router: Router) { }

  // Handle LoginButtonClick
  handleLoginButtonClick = output()

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
          this.error.set('')
          this.router.navigate(['/']);

        } else {
          // Mostramos modal de error de login y borramos el token
          this.authService.eraseSessionToken();
          // Mostramos modal de error de login
          this.error.set('Error de acceso.')
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
