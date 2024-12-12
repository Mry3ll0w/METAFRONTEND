import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [PrimaryButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit {

  // Servicio 
  authService = inject(AuthService)

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
        console.log("Valor de token " + res);
        if (res.success) {
          this.authService.setSessionToken(res.token ?? '');
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

    if (this.authService.getSessionToken() == '') {
      // Limpiamos la session 
      this.username.set('');
      this.password.set('');
    }
    else {// Ya esta logg, lo mandamos a /
      this.router.navigate(['/'], {
        queryParams: {}, // Optional query parameters
      });
    }


  }



}
