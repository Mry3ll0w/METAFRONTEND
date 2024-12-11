import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: String = 'http://localhost:8080/';

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
  fetchUsers() {

  }

  constructor(private http: HttpClient) { }
}
