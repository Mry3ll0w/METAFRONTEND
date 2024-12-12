import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // Signal que indica si se debe mostrar el contenido del header
  showHeaderContent = signal<boolean>(true);

  constructor() { }

  // Método para cambiar el valor de la propiedad showHeaderContent
  setShowHeaderContent(show: boolean) {
    this.showHeaderContent.set(show);
  }
}
