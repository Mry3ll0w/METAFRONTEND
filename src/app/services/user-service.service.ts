import { Injectable, signal, inject } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from './localStorage/local-storage.service';
import { lastValueFrom, map, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: String = 'http://localhost:8080/';
  private localStorageService = inject(StorageService);

  // Signal encargado de mostrar los elementos en el template
  lUsuarios = signal<Usuario[]>([]);


  addToUsers(user: Usuario) {
    this.lUsuarios.set([...this.lUsuarios(), user])
  }

  // Fetches the users from the server, needs base auth header
  async fetchUsers(): Promise<void> {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.getItem('sessionToken'),
    });
    console.log("URL DE userFetch " + `${this.baseUrl}user`)
    this.http.get<Usuario[]>(
      `${this.baseUrl}user`, { headers }
    ).subscribe((d) => {
      this.lUsuarios.set(d)
    }
    );

  }

  // Fetches the users from the server, needs base auth header
  async fetchUser(username: string): Promise<{ usuario: Usuario, status: number }> {
    let user: Usuario = { nombre: '', apellidos: '', usuario: '' };
    try {


      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.localStorageService.getItem('sessionToken'),
      });

      const requestUserData = await lastValueFrom<Usuario>(this.http.get<Usuario>(
        `${this.baseUrl}user/${username}`, { headers }
      ))

      return { usuario: requestUserData, status: 200 }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return { usuario: user, status: error.status }
      }
    }
    return { usuario: user, status: 500 }
  }

  constructor(private http: HttpClient) { }
}
