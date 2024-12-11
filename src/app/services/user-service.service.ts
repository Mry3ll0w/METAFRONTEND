import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/Usuario';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  lUsers = signal<Usuario[]>([]);

  addToUsers(user: Usuario) {
    this.lUsers.set([...this.lUsers(), user])
  }

  constructor() { }
}
