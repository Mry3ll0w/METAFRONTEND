import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginModalComponent } from './pages/login/login-modal/login-modal.component';
import { EditUserComponent } from './pages/usuarios/edit-user/edit-user.component';

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
    },
    {
        path: 'editUser/:username',
        component: EditUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'testing',
        component: LoginModalComponent
    }


];
