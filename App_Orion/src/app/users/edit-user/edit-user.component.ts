import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormUserComponent } from "../form-user/form-user.component";
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { UserCreateDTO, UserDTO } from '../user';
import { catchError, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  imports: [FormUserComponent, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  constructor(private router: Router, private usersService: UsersService, private activatedRoute: ActivatedRoute) {}

  model!: UserDTO;

  errors: string[] = [];

  isAdmin: boolean = true;

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => {
        const userId = params['id'];

        if (!userId) {
          console.error('El ID del usuario no está definido.');
          this.router.navigate(['/users']);
          return [];
        }

        return this.usersService.getUser(userId).pipe(
          catchError(error => {
            console.error('Error al cargar el usuario:', error);
            this.router.navigate(['/users']);
            return [];
          })
        );
      })
    ).subscribe(response => {
      if (!response) {
        console.error('Los datos del usuario no están disponibles.');
        this.router.navigate(['/users']);
        return;
      }
      this.model = response;
    });
  }

  saveChanges(user: UserCreateDTO) {
    if (!user || !this.model) {
      console.error('El formulario o el modelo no están inicializados correctamente.');
      return;
    }

    if (!user.Nombre || !user.Email || !user.FechaNacimiento || !user.Password) {
      console.error('Faltan campos obligatorios en el formulario.');
      return;
    }

    const fechaNacimiento = typeof user.FechaNacimiento === 'string' 
      ? new Date(user.FechaNacimiento) 
      : user.FechaNacimiento;

    user.FechaNacimiento = fechaNacimiento instanceof Date && !isNaN(fechaNacimiento.getTime())
      ? fechaNacimiento
      : new Date();

    this.usersService.edit(this.model.Id, user).subscribe({
      next: () => {
        this.router.navigate([`/user/${this.model.Id}`]);
      },
      error: (err) => {
        console.error('Error al guardar los cambios:', err);
      }
    });
  }
}
