import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: String = 'http://localhost:8080/';

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
    localStorage.setItem('sessionToken', token);
  }

  // Erase session token
  async eraseSessionToken(): Promise<any> {
    localStorage.setItem('sessionToken', '');
  }

  constructor(private http: HttpClient) { }
}
