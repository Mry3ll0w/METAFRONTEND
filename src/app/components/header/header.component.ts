import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service'; // Inyectar el servicio
import { AuthService } from '../../services/auth-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserAlt, faMedkit, faPumpMedical, faPaperclip, faPenFancy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  // Inyectar el servicio HeaderService
  headerService = inject(HeaderService);
  authService = inject(AuthService)
  userService = inject(UserService);

  // Usar directamente la señal desde el servicio
  showHeaderContent = this.headerService.showHeaderContent;

  title = signal<string>('METAFRONTEND');
  addUserButtonLabel = signal<string>('Agregar Usuario');
  testButtonLabel = signal<string>('Test');

  // Iconos
  usuarioIcon = faUserAlt
  medicIcon = faMedkit
  pacienteIcon = faPumpMedical
  citaIcon = faPenFancy
  diagnosticosIcon = faPaperclip

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  addUserButtonClicked() {
    this.router.navigate(['/']);
  }

  async signOutButtonHandler(): Promise<void> {
    this.authService.eraseSessionToken();
    this.router.navigate(['/login'])
  }

  // Para testing
  async testFunction(): Promise<void> {

  }
}