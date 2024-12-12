import { Component, inject, OnInit, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { UserService } from '../../services/user-service.service';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service'; // Inyectar el servicio
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  // Inyectar el servicio HeaderService
  headerService = inject(HeaderService);
  authService = inject(AuthService)

  // Usar directamente la señal desde el servicio
  showHeaderContent = this.headerService.showHeaderContent;

  title = signal<string>('METAFRONTEND');
  addUserButtonLabel = signal<string>('Agregar Usuario');
  testButtonLabel = signal<string>('Test');

  userService = inject(UserService);

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  addUserButtonClicked() {
    var testUser: Usuario = { nombre: 'Antonio', apellidos: 'Hernandez', usuario: 'antonio' };
    this.userService.addToUsers(testUser);
  }

  async signOutButtonHandler(): Promise<void> {
    this.authService.eraseSessionToken();
    this.router.navigate(['/login'])
  }

  // Para testing
  async testFunction(): Promise<void> {

  }
}