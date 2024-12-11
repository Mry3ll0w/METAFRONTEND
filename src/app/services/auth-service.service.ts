import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: String = 'http://localhost:8080/';

  //! Borrar en cuanto tengamos test
  // Fetches the users from the server, needs base auth header
  async getLogInToken(user: string, password: string): Promise<string> {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${user}:${password}`),
    });

    var body = {
    }

    const res = await lastValueFrom(this.http.post(
      `${this.baseUrl}token`, body, { headers, responseType: 'text' }
    ));


    return res.toString();
  }

  // Set session token
  async setSessionToken(token: string): Promise<any> {
    // pillamos el token usando la funcion anterior
    // Creamos la variable de sesion
    localStorage.setItem('sessionToken', token);
  }

  constructor(private http: HttpClient) { }
}
