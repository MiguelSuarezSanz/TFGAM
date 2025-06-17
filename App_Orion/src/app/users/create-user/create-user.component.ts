import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_PROFILE_IMAGE, UserCreateDTO } from '../user';
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
    if (!user) {
        console.error('El formulario no está inicializado correctamente.');
        return;
    }

    if (!user.Nombre || !user.Email || !user.FechaNacimiento || !user.Password) {
        console.error('Faltan campos obligatorios en el formulario.');
        return;
    }

    // Ensure all required fields are explicitly set
    user.Perfil = user.Perfil || DEFAULT_PROFILE_IMAGE;
    user.Privilegios = user.Privilegios || 'Usuario';
    user.Bloqueado = user.Bloqueado || false;
    const fechaNacimiento = typeof user.FechaNacimiento === 'string' 
        ? new Date(user.FechaNacimiento) 
        : user.FechaNacimiento;

    user.FechaNacimiento = fechaNacimiento instanceof Date && !isNaN(fechaNacimiento.getTime())
        ? fechaNacimiento
        : new Date();

    this.usersService.crear(user).subscribe({
      next: (id: number) => {
        console.log("Usuario creado con éxito, ID:", id); 
        this.router.navigate(['users/' + id]);
      },
      error: (err) => {
        console.error("Error al crear usuario:", err);
        if (err.status === 422 && err.error && err.error.detail) {
          this.errors = Array.isArray(err.error.detail) ? err.error.detail : [err.error.detail];
        } else {
          this.errors = ['Error inesperado al crear el usuario.'];
        }
      }
    });
  }
}