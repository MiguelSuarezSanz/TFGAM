import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_PROFILE_IMAGE, UserCreateDTO } from '../user';
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
  isAdmin: boolean = true;

  @Output()
  OnCancel: EventEmitter<void> = new EventEmitter<void>();

  // Ajuste para que los campos del formulario estén vacíos
  register(user: UserCreateDTO) {
    if (!user) {
        console.error('El formulario no está inicializado correctamente.');
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
    user.Password = user.Password || '123456';
    user.Perfil = user.Perfil || DEFAULT_PROFILE_IMAGE;
    user.Privilegios = user.Privilegios || 'Usuario';
    user.Bloqueado = user.Bloqueado || false;

    this.usersService.crear(user).subscribe({
      next: (id: number) => {
        console.log("Usuario registrado con éxito, ID:", id);
        this.router.navigate(['users/' + id]);
        this.closeModal();
      },
      error: (err) => {
        console.error("Error al registrar usuario:", err);
        if (err.status === 422 && err.error && err.error.detail) {
          this.errors = Array.isArray(err.error.detail) ? err.error.detail : [err.error.detail];
        } else {
          this.errors = ['Error inesperado al registrar el usuario.'];
        }
      }
    });
  }

  public cancel(): void {
    this.OnCancel.emit();
  }

  closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.classList.remove('show');
    }
  }
}
