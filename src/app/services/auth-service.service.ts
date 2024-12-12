import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { StorageService } from './localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: String = 'http://localhost:8080/';
  private localStorageService = inject(StorageService);


  //! Borrar en cuanto tengamos test
  // Fetches the users from the server, needs base auth header
  async getLogInToken(user: string, password: string): Promise<{ success: boolean, token: string | null }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${user}:${password}`),
    });

    const body = {};

    try {
      const res = await lastValueFrom(
        this.http.post(`${this.baseUrl}token`, body, { headers, responseType: 'text' })
      );
      // Si la solicitud fue exitosa, asumimos un 200
      return { success: true, token: res as string };
    } catch (error) {
      // Manejar errores
      if (error instanceof HttpErrorResponse) {
        // Verificar código de estado
        if (error.status === 200) {
          return { success: true, token: error.error as string };
        }
      }
      return { success: false, token: null };
    }
  }

  // Set session token
  async setSessionToken(token: string): Promise<any> {
    // pillamos el token usando la funcion anterior
    // Creamos la variable de sesion
    this.localStorageService.setItem('sessionToken', token);
  }

  async getSessionToken(): Promise<any> {
    return this.localStorageService.getItem('sessionToken');
  }

  // Erase session token
  async eraseSessionToken(): Promise<any> {
    //! NO FUNCIONA EL HEADER OCULTO
    this.localStorageService.removeItem('sessionToken');
  }

  constructor(private http: HttpClient) { }




}
