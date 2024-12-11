import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: String = 'http://localhost:8080/';

  //! Borrar en cuanto tengamos test
  private username: string = 'ara'
  private password: string = '4'

  lUsuarios = signal<Usuario[]>([
    { nombre: 'Antonio', apellidos: 'Hernandez', usuario: 'antonio' },
    { nombre: 'Maria', apellidos: 'Hernandez', usuario: 'maria' },
    { nombre: 'Pedro', apellidos: 'Hernandez', usuario: 'pedro' },
    { nombre: 'Luis', apellidos: 'Hernandez', usuario: 'luis' },
  ]);





  addToUsers(user: Usuario) {
    this.lUsuarios.set([...this.lUsuarios(), user])
  }

  // Fetches the users from the server, needs base auth header
  async fetchUsers(): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`ara:1234`),
    });

    var body = {
      username: this.username,
      password: this.password
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

  constructor(private http: HttpClient) { }
}
