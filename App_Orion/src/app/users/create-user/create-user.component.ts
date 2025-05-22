import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCreateDTO } from '../user';
import { UsersService } from '../users.service';
import { parseErrorsApi } from '../../utilidades/utilidades';
import { FormUserComponent } from '../form-user/form-user.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormUserComponent], 
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'] 
})
export class CreateUserComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router) {}

  errors: string[] = [];

  ngOnInit(): void {}

  saveChange(user: UserCreateDTO) {
    this.usersService.crear(user).subscribe({
      next: (id: number) => {
        console.log("Usuario creado con éxito, ID:", id); 
        this.router.navigate(['users/' + id]);
      },
      error: (err) => {
        console.error("Error al crear usuario:", err);
        if (err.status === 422) {
          this.errors = err.error.detail;
        } else {
          this.errors = ['Error inesperado al crear el usuario.'];
        }
      }
    });
  }
}