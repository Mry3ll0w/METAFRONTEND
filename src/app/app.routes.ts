import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UsuariosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    }


];
