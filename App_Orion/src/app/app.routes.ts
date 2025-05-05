import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router';

import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DetailUserComponent } from './users/detail-user/detail-user.component';


import { CharacterIndexComponent } from './characters/character-index/character-index.component';
import { IndexUsersComponent } from './users/index-users/index-users.component';


export const routes: Routes = [

    // Routing Users
    {path: 'users/create', component: CreateUserComponent},
    {path: 'users/edit/:id', component: EditUserComponent},
    {path: 'users/detail/:id', component: DetailUserComponent},
    {path: 'users', component: IndexUsersComponent},
    // Routing Characters
    {path: 'Characters', component: CharacterIndexComponent},

    {path: '', component:IndexUsersComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutinModule {}
