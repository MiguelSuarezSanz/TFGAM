import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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


@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent implements OnInit{
  
  constructor(private formBuilder: FormBuilder){
    
  }

  form!: FormGroup;
  
  @Input()
  model!: UserDTO;

  @Input()
  errors: string[] = []

  @Output()
  OnSubmit: EventEmitter<UserCreateDTO> = new EventEmitter<UserCreateDTO>();

  privilegios = ['Admin','Usuario']
  imageChange = false;

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

    if(this.model !== undefined){
      this.form.patchValue(this.model)
    }

  }

  imageSelected(file: any){
    this.imageChange = true;
    this.form.get('perfil')?.setValue(file);
  }



  onSubmit(){
    if(!this.imageChange){
      this.form.patchValue({'perfil':null})
    }

    this.OnSubmit.emit(this.form.value);
  }

}
