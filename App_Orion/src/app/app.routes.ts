import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router';

import { CreateUserComponent } from './users/create-user/create-user.component';

import { CharacterIndexComponent } from './characters/character-index/character-index.component';
import { IndexUsersComponent } from './users/index-users/index-users.component';


export const routes: Routes = [

    // Routing Users
    {path: 'users/create', component: CreateUserComponent},
    {path: 'users', component: IndexUsersComponent},
    // Routing Characters
    {path: 'Characters', component: CharacterIndexComponent},

    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutinModule {}
