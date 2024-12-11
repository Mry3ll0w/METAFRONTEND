import { Component, inject, OnInit, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { UserService } from '../../services/user-service.service';
import { Usuario } from '../../models/Usuario';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent implements OnInit {

  // Pillamos la ruta actual usando la funcion getCurrentPath
  currentPath = signal<string>('');
  showHeaderContent = signal<boolean>(true);

  //title: string = "METAFRONTEND" // No recomendado, es mejor usar un signal, mejor reaccion + ez tracking
  title = signal<string>('METAFRONTEND');
  addUserButtonLabel = signal<string>('Agregar Usuario');

  // Boton de test
  testButtonLabel = signal<string>('Test');


  // Para comunicarnos con los hijos usaremos eventos
  userService = inject(UserService)

  // Functions
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Escuchar los cambios de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Aquí detectas la ruta en que estás
        const currentRoute = event.url;

        // Mostrar u ocultar contenido dependiendo de la ruta
        this.showHeaderContent.set(currentRoute !== '/login'); // Si la ruta es '/login', ocultar el contenido
      }
    });
  }


  addUserButtonClicked() {
    // Call create service
    var testUser: Usuario = { nombre: 'Antonio', apellidos: 'Hernandez', usuario: 'antonio' };
    this.userService.addToUsers(testUser);
  }

  // test to pass functions  
  testFunction() {
    console.log("hola desde test function")
  }
}
