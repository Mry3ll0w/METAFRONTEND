import { Component, inject, OnInit, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { UserService } from '../../services/user-service.service';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service'; // Inyectar el servicio

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  // Inyectar el servicio HeaderService
  headerService = inject(HeaderService);

  // Usar directamente la señal desde el servicio
  showHeaderContent = this.headerService.showHeaderContent;

  title = signal<string>('METAFRONTEND');
  addUserButtonLabel = signal<string>('Agregar Usuario');
  testButtonLabel = signal<string>('Test');

  userService = inject(UserService);

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Escuchar cambios de la señal showHeaderContent para realizar alguna acción

  }

  addUserButtonClicked() {
    var testUser: Usuario = { nombre: 'Antonio', apellidos: 'Hernandez', usuario: 'antonio' };
    this.userService.addToUsers(testUser);
  }

  async testFunction(): Promise<void> {
    const data = await this.userService.fetchUsers()
    console.log(data)
  }
}