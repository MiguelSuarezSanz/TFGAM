import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PublicacionCreateDTO } from '../publicacion';

@Component({
  selector: 'app-form-publicacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './form-publicacion.component.html',
  styleUrls: ['./form-publicacion.component.css']
})
export class FormPublicacionComponent implements OnInit {
  @Input() publicacion!: PublicacionCreateDTO;
  @Output() OnSubmit = new EventEmitter<PublicacionCreateDTO>();
  @Output() OnCancel = new EventEmitter<void>();

  // Ensure formGroup is properly defined
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      Titulo: ['', Validators.required],
      Contenido: ['', Validators.required],
      Imagen: ['']
    });
  }

  ngOnInit(): void {
    // Initialize component
  }

  guardarCambios(): void {
    if (this.form.valid) {
      this.OnSubmit.emit(this.form.value as PublicacionCreateDTO);
    } else {
      console.error('Form is invalid');
    }
  }

  cancelar(): void {
    this.OnCancel.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      const publicacion: PublicacionCreateDTO = {
        Titulo: formValues.Titulo,
        Contenido: formValues.Contenido,
        Imagen: formValues.Imagen || '',
        FechaPubl: new Date(),
        Id_Usuario: this.publicacion.Id_Usuario
      };
      this.OnSubmit.emit(publicacion);
    }
  }

  onCancel(): void {
    console.log('Form cancelled');
  }

  // Add missing onFileSelected method
  onFileSelected(event: Event): void {
    console.log('File selected:', event);
  }
}
