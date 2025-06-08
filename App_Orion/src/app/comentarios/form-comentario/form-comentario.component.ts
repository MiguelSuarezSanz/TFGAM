import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ComentarioCreateDTO } from '../comentario';

@Component({
  selector: 'app-form-comentario',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form-comentario.component.html',
  styleUrls: ['./form-comentario.component.css']
})
export class FormComentarioComponent implements OnInit {
  @Input()
  modelo: ComentarioCreateDTO = {
    contenido: '',
    fecha: new Date(),
    idPublicacion: 0,
    idUsuario: 0
  };

  @Input()
  isDisabled = false;

  @Output()
  onSubmit: EventEmitter<ComentarioCreateDTO> = new EventEmitter<ComentarioCreateDTO>();

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      contenido: ['', [Validators.required, Validators.minLength(1)]],
      fecha: [new Date()],
      idPublicacion: [0, Validators.required],
      idUsuario: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.modelo);
    
    if (this.isDisabled) {
      this.form.disable();
    }
  }

  guardarCambios(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

  cancelar(): void {
    this.onCancel.emit();
  }

  get f() {
    return this.form.controls;
  }
}
