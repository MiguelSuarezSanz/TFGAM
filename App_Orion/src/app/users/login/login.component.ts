import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginDTO } from '../user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
    imports: [    
      MatFormFieldModule,
      MatCheckboxModule,
      MatSelectModule,
      MatInputModule,
      MatButtonModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatOptionModule,
      FormsModule,
      CommonModule,
      ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  @Input()
  errors: string[] = [];

  @Output()
  OnSubmit: EventEmitter<UserLoginDTO> = new EventEmitter<UserLoginDTO>();

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  public logIn(): void {
    if (this.form.invalid) {
      this.errors = ['Por favor, completa todos los campos requeridos.'];
      return;
    }

    const loginData: UserLoginDTO = this.form.value;
    this.usersService.logIn(loginData).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('token', response.token); // Almacenar el token JWT
        this.OnSubmit.emit(loginData);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.errors = ['Error al iniciar sesión. Por favor, inténtalo de nuevo.'];
      },
    });
  }

  onSubmit(): void {
    this.logIn();
  }
}