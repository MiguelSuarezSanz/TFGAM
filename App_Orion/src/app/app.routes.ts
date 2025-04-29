import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router';

import { CreateUserComponent } from './users/create-user/create-user.component';

import { CharacterIndexComponent } from './characters/character-index/character-index.component';


export const routes: Routes = [

    {path: 'users/create', component: CreateUserComponent},
    {path: 'Characters', component: CharacterIndexComponent},

    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutinModule {}
