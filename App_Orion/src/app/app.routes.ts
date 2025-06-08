import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DetailUserComponent } from './users/detail-user/detail-user.component';


import { CharacterIndexComponent } from './characters/character-index/character-index.component';
import { IndexUsersComponent } from './users/index-users/index-users.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { AuthGuard } from './users/auth/auth.guard';
import { CreatePublicacionComponent } from './publicaciones/create-publicacion/create-publicacion.component';
import { EditPublicacionComponent } from './publicaciones/edit-publicacion/edit-publicacion.component';
import { DetailPublicacionComponent } from './publicaciones/detail-publicacion/detail-publicacion.component';
import { ListPublicacionesComponent } from './publicaciones/list-publicaciones/list-publicaciones.component';
import { ListComentariosComponent } from './comentarios/list-comentarios/list-comentarios.component';


export const routes: Routes = [
    // Index
    {path: '', component: IndexComponent},

    // Routing Users
    {path: 'users/create', component: CreateUserComponent, canActivate: [AuthGuard]},
    {path: 'users/edit/:id', component: EditUserComponent},
    {path: 'users/detail/:id', component: DetailUserComponent},
    {path: 'users', component: IndexUsersComponent, canActivate: [AuthGuard]},
    {path: 'users/login', component: LoginComponent},
    {path: 'users/register', component: RegisterComponent},

    // Routing Characters
    {path: 'Characters', component: CharacterIndexComponent},

    // Routing Publicaciones
    {path: 'publicaciones/create', component: CreatePublicacionComponent, canActivate: [AuthGuard]},
    {path: 'publicaciones/edit/:id', component: EditPublicacionComponent},
    {path: 'publicaciones/detail/:id', component: DetailPublicacionComponent},
    {path: 'publicaciones', component: ListPublicacionesComponent},
    {path: 'publicaciones',component: ListPublicacionesComponent},
    {path: 'publicaciones/:id',component: DetailPublicacionComponent},
    {path: 'comentarios',component: ListComentariosComponent},

    {path: '', component:IndexUsersComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutinModule {}
