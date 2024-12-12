import { Injectable, signal, inject } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './localStorage/local-storage.service';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: String = 'http://localhost:8080/';
  private localStorageService = inject(StorageService);


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
      Authorization: 'Bearer ' + this.localStorageService.getItem('sessionToken'),
    });
    console.log("URL DE userFetch " + `${this.baseUrl}user`)
    const data = this.http.get(
      `${this.baseUrl}user`, { headers }
    ).subscribe((d) => {
      console.log(d)
    }
    );


    return data;
  }

  constructor(private http: HttpClient) { }
}
