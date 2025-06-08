import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComentariosService } from '../comentarios.service';
import { FormComentarioComponent } from '../form-comentario/form-comentario.component';
import { ComentarioCreateDTO } from '../comentario';

@Component({
  selector: 'app-create-comentario',
  standalone: true,
  imports: [
    CommonModule, 
    FormComentarioComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './create-comentario.component.html',
  styleUrls: ['./create-comentario.component.css']
})
export class CreateComentarioComponent {
  @Input() idPublicacion: number = 0;
  @Input() idUsuario: number = 0;
  @Output() comentarioCreado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();
  
  private comentariosService = inject(ComentariosService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  
  errors: string[] = [];
  isSubmitting = false;

  modeloInicial: ComentarioCreateDTO = {
    contenido: '',
    fecha: new Date(),
    idPublicacion: this.idPublicacion,
    idUsuario: this.idUsuario
  };

  guardarCambios(comentario: ComentarioCreateDTO) {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.errors = [];
    
    comentario.idPublicacion = this.idPublicacion;
    comentario.idUsuario = this.idUsuario;
    comentario.fecha = new Date();
    
    this.comentariosService.crear(comentario).subscribe({
      next: () => {
        this.snackBar.open('Comentario creado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.comentarioCreado.emit();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error al crear comentario:', err);
        this.isSubmitting = false;
        if (err.status === 422) {
          this.errors = Array.isArray(err.error.detail) ? err.error.detail : [err.error.detail];
        } else {
          this.errors = ['Error inesperado al crear el comentario.'];
        }
        this.snackBar.open('Error al crear el comentario', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  cancelar() {
    this.cancelado.emit();
    if (this.idPublicacion) {
      this.router.navigate(['/publicaciones', this.idPublicacion]);
    }
  }
}
