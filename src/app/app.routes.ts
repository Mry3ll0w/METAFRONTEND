import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UsuariosComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    }


];
