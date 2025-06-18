import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComentarioCreateDTO } from '../comentario';

@Component({
  selector: 'app-form-comentario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './form-comentario.component.html',
  styleUrls: ['./form-comentario.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormComentarioComponent implements OnInit {
  @Input() comentario!: ComentarioCreateDTO;
  @Output() OnSubmit = new EventEmitter<ComentarioCreateDTO>();
  @Output() OnCancel = new EventEmitter<void>();

  form!: FormGroup;
  isDisabled: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const now = new Date();
    this.form = this.fb.group({
      Contenido: ['', [Validators.required, Validators.minLength(5)]],
      Fecha: [`${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()}`, Validators.required],
      IdPublicacion: [this.getCurrentPublicationId(), Validators.required],
      IdUsuario: [this.getCurrentUserId(), Validators.required]
    });
  }

  private getCurrentPublicationId(): number {
    const url = window.location.href;
    const match = url.match(/publicacion\/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  private getCurrentUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.id || 0;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    return 0;
  }
  guardarCambios(): void {

    console.log('Guardando cambios:', this.comentario);

    if (this.form.valid) {
      this.OnSubmit.emit(this.comentario);
    }
  }

  cancelar(): void {
    this.OnCancel.emit();
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
