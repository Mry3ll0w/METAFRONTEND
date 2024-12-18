import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from './localStorage/local-storage.service';
import { lastValueFrom, map, retry } from 'rxjs';
import { Medico } from '../models/medico';
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private baseUrl: String = 'http://localhost:8080/';
  private localStorageService = inject(StorageService);

  // Signal encargado de mostrar los elementos en el template
  lMedicos = signal<Medico[]>([]);


  addToUsers(user: Medico) {
    this.lMedicos.set([...this.lMedicos(), user])
  }

  // Fetches the users from the server, needs base auth header
  async getMedicos(): Promise<void> {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.getItem('sessionToken'),
    });
    this.http.get<Medico[]>(
      `${this.baseUrl}medico`, { headers }
    ).subscribe((d) => {
      this.lMedicos.set(d)
    }
    );

  }

  // Fetches the users from the server, needs base auth header
  async fetchUser(numColegiado: string): Promise<{ Medico: Medico, status: number }> {
    let med: Medico = { nombre: '', apellidos: '', usuario: '', numColegiado: '' };
    try {


      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.localStorageService.getItem('sessionToken'),
      });

      const requestMedicoData = await lastValueFrom<Medico>(this.http.get<Medico>(
        `${this.baseUrl}medico/${numColegiado}`, { headers }
      ))

      return { Medico: requestMedicoData, status: 200 }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return { Medico: med, status: error.status }
      }
    }
    return { Medico: med, status: 500 }
  }

  //Update User
  async updateMedicoValues(Medico: string, newUserUpdates: Medico, password: string): Promise<boolean> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.getItem('sessionToken'),
    });

    var body;
    // Si password tiene un valor, agregamos el campo clave con el valor newPatch
    if (password !== '') {
      //Agregamos al campo body la password si esta ha sido cambiada
      body = { ...newUserUpdates, clave: password };
    } else {
      body = newUserUpdates;
    }

    console.log(body)

    try {
      await lastValueFrom(
        this.http.patch(`${this.baseUrl}user/${Medico}`, body, { headers, responseType: 'text' })
      );
      // Si la solicitud fue exitosa, asumimos un 200
      return true;
    } catch (error) {

      // Manejar errores
      if (error instanceof HttpErrorResponse) {
        // Verificar código de estado
        return error.status === 200;// Si da un 401 o 403, no está autorizado
      }

    }

    return true


  }

  // Filtramos los Medicos obtenidos por Medico
  async filterFetchedMedicsByPattern(pattern: string): Promise<void> {

    //Reset the fetched users
    if (pattern === '') {
      this.getMedicos();
    } else {
      // Filtramos por los existentes
      let filteredUsers: Medico[] = []
      this.lMedicos().forEach((u) => {
        if (u.nombre.includes(pattern) || u.apellidos.includes(pattern) || u.usuario.includes(pattern)) {
          filteredUsers.push(u)
        }
      })
      this.lMedicos.set(filteredUsers)
    }

  }


  // Creacion de Medicos
  async createMedico(newUserDTO: Medico, password: string): Promise<boolean> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.localStorageService.getItem('sessionToken'),
    });

    var body = { ...newUserDTO, clave: password, usertype: 4 };
    console.log(body)
    try {
      await lastValueFrom(
        this.http.post(`${this.baseUrl}user/create`, body, { headers, responseType: 'text' })
      );
      // Si la solicitud fue exitosa, asumimos un 200
      return true;
    } catch (error) {

      // Manejar errores
      if (error instanceof HttpErrorResponse) {
        // Verificar código de estado
        return error.status === 200;// Si da un 401 o 403, no está autorizado
      }

    }

    return true


  }

  constructor(private http: HttpClient) { }
}
