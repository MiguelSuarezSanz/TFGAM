import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserCreateDTO } from '../user';
import { UsersService } from '../users.service';
import { FormUserComponent } from "../form-user/form-user.component";

@Component({
  selector: 'app-register',
  imports: [FormUserComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private usersService: UsersService, private router: Router) {}

  errors: string[] = [];

  register(user: UserCreateDTO) {
    this.usersService.registrar(user).subscribe({
      next: (id: number) => {
        console.log("Usuario registrado con éxito, ID:", id);
        this.router.navigate(['users/' + id]);
      },
      error: (err) => {
        console.error("Error al registrar usuario:", err);
        if (err.status === 422) {
          this.errors = err.error.detail;
        } else {
          this.errors = ['Error inesperado al registrar el usuario.'];
        }
      }
    });
  }
}
