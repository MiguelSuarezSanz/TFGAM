import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { UserCreateDTO, UserDTO } from '../user';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';



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
  
  constructor(private formBuilder: FormBuilder) {}
  
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
    this.form = this.formBuilder.group({
      Nombre: ['', { validators: [Validators.required] }],
      Email: ['', { validators: [Validators.required, Validators.email] }],
      FechaNacimiento: ['', { validators: [Validators.required] }],
      Password: ['', { validators: [Validators.required] }],
      Privilegios: [{ value: 'Usuario', disabled: !this.isAdmin }, { validators: [Validators.required] }],
      Bloqueado: [{ value: false, disabled: !this.isAdmin }],
      Perfil: ['']
    });

    if(this.model){
      console.log(this.model);
      this.form.patchValue(this.model);
    };

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model && this.form) {
      this.form.patchValue(this.model);
    }
  }

  imageSelected(file: any){
    this.imageChange = true;
    this.form.get('perfil')?.setValue(file);
  }

  onSubmit() {
    if (this.form.valid) {
        console.log("Datos del formulario enviados:", this.form.value);  // Log para depuración
        this.OnSubmit.emit(this.form.value);
    } else {
        console.error("Formulario inválido:", this.form.errors);  // Log de errores
    }
  }

  onCancel() {
    this.OnCancel.emit();
  }
}
