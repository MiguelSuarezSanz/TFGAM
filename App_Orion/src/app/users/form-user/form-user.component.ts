import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UserCreateDTO } from '../user';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent implements OnInit{
  
  constructor(private formBuilder: FormBuilder){
    
  }

  form!: FormGroup;
  
  @Output()
  OnSubmit: EventEmitter<UserCreateDTO> = new EventEmitter<UserCreateDTO>();

  ngOnInit(): void{
    this.form = this.formBuilder.group({
      nombre: ['', {validators: [Validators.required]}],
      email: ['', {validatros: [Validators.email,Validators.required]}],
      fechaNacimiento: ['', {validators: [Validators.required]}],
      password: ['', {validators: [Validators.required]}],
      perfil: [''],
      privilegios: ['', {validators: [Validators.required]}],
      bloqueado: ['']
    })

  }

}
