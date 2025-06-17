import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { UserCreateDTO, UserDTO, DEFAULT_PROFILE_IMAGE } from '../user';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [    MatFormFieldModule,
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
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit, OnChanges{
  isAdmin: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}
  
  form!: FormGroup;
  
  @Input()
  model!: UserDTO;

  @Input()
  errors: string[] = [];

  @Output()
  OnSubmit: EventEmitter<UserCreateDTO> = new EventEmitter<UserCreateDTO>();

  @Output()
  OnCancel: EventEmitter<void> = new EventEmitter<void>();

  privilegios = ['Admin','Usuario'];
  imageChange = false;

  ngOnInit(): void{
    this.isAdmin = this.authService.isAdmin();
    try {
        this.form = this.formBuilder.group({
            Nombre: ['', [Validators.required]],
            Email: ['', [Validators.required, Validators.email]],
            FechaNacimiento: ['', [Validators.required]],
            Password: ['', [Validators.required]],
            Privilegios: [{ value: 'Usuario', disabled: !this.isAdmin }, [Validators.required]],
            Bloqueado: [{ value: false, disabled: !this.isAdmin }],
            Perfil: [DEFAULT_PROFILE_IMAGE]
        });

        if (this.model) {
            this.form.patchValue(this.model);
            // Ensure FechaNacimiento is formatted correctly
            const fechaNacimiento = this.model.FechaNacimiento;
            if (fechaNacimiento instanceof Date) {
                this.form.get('FechaNacimiento')?.setValue(fechaNacimiento.toISOString().split('T')[0]);
            } else if (typeof fechaNacimiento === 'string') {
                this.form.get('FechaNacimiento')?.setValue(fechaNacimiento);
            }
        }

        // Ensure default values for missing fields
        if (!this.form.get('Perfil')?.value) {
            this.form.get('Perfil')?.setValue(DEFAULT_PROFILE_IMAGE);
        }
    } catch (error) {
        console.error('Error initializing form:', error);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
        if (changes['model'] && this.model && this.form) {
            console.log('Model changes detected:', changes['model']);
            this.form.patchValue(this.model);

            const fechaNacimiento = this.model.FechaNacimiento;
            if (fechaNacimiento instanceof Date) {
                this.form.get('FechaNacimiento')?.setValue(fechaNacimiento.toISOString().split('T')[0]);
            } else if (typeof fechaNacimiento === 'string') {
                this.form.get('FechaNacimiento')?.setValue(fechaNacimiento);
            }
        }
    } catch (error) {
        console.error('Error in ngOnChanges:', error);
    }
}

  imageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.imageChange = true;
        this.form.get('Perfil')?.setValue(input.files[0]);
    }
}

  onSubmit() {
    if (!this.form) {
        console.error('El formulario no está inicializado correctamente.');
        return;
    }

    if (this.form.valid) {
        const formValue = this.form.value;
        // Format FechaNacimiento as a date
        if (formValue.FechaNacimiento instanceof Date) {
            formValue.FechaNacimiento = formValue.FechaNacimiento.toISOString().split('T')[0];
        }

        console.log("Datos del formulario enviados:", formValue);  // Log para depuración
        this.OnSubmit.emit(formValue);
    } else {
        console.error("Formulario inválido:", this.form.errors);  // Log de errores
    }
  }

  onCancel() {
    if (!this.OnCancel) {
      console.error('El evento OnCancel no está inicializado.');
      return;
    }
    this.OnCancel.emit();
  }
}
