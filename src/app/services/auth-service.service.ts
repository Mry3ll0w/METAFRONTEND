import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl: String = 'http://localhost:8080/';

  //! Borrar en cuanto tengamos test
  // Fetches the users from the server, needs base auth header
  async getLogInToken(user: string, password: string): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${user}:${password}`),
    });

    var body = {
    }

    this.http.post(
      `${this.baseUrl}token`, body, { headers, responseType: 'text' }
    )
      .subscribe(
        res => {
          console.log(res);
        }
      );
    return null;
  }

  // Set session token
  async setSessionToken(): Promise<any> {
    // pillamos el token usando la funcion anterior
    const token = await this.getLogInToken('ara', '1234');
    // Creamos la variable de sesion
    localStorage.setItem('sessionToken', token);
  }

  constructor(private http: HttpClient) { }
}
