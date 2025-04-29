import { Component, OnInit } from '@angular/core';
import { FormUserComponent } from "../form-user/form-user.component";
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { UserCreateDTO } from '../user';
import { parseErrorsApi } from '../../../utilidades/utilidades';

@Component({
  selector: 'app-create-user',
  imports: [FormUserComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{
  constructor(private usersService: UsersService, private router: Router){}

  errors: string[] = []

  ngOnInit(): void {

  }

saveChange(user: UserCreateDTO){
  this.usersService.crear(user)
    .subscribe((id: number) => this.router.navigate(['ussers/'+id]), errors => this.errors = parseErrorsApi(errors));
}
}
