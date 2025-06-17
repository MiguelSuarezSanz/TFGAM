import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ComentariosService } from '../comentarios.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { ComentarioCreateDTO } from '../comentario';

@Component({
  selector: 'app-create-comentario',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatError
  ],
  templateUrl: './create-comentario.component.html',
  styleUrls: ['./create-comentario.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateComentarioComponent {
  now = new Date();
  isSubmitting: boolean = false;
  modeloInicial: ComentarioCreateDTO = {
    Contenido: '',
    Fecha: new Date(`${this.now.getFullYear()}-${(this.now.getMonth() + 1).toString().padStart(2, '0')}-${this.now.getDate().toString().padStart(2, '0')}`),
    Id_Publicacion: this.getCurrentPublicationId(),
    Id_Usuario: this.getCurrentUserId()
  };
  errors: string[] = [];

  constructor(
    private router: Router,
    private comentariosService: ComentariosService
  ) {}

  cancelar() {
    console.log('Cancelado');
  }

  saveChange(event: ComentarioCreateDTO): void {
    console.log('Save change:', event);
  }

  guardarComentario(): void {
    if (!this.modeloInicial.Fecha || typeof this.modeloInicial.Fecha === 'string') {
      this.modeloInicial.Fecha = new Date(this.modeloInicial.Fecha || new Date().toISOString());
    }

    this.comentariosService.crear(this.modeloInicial).subscribe({
      next: () => {
        console.log('Comentario creado exitosamente');
        // Aquí puedes agregar la lógica adicional que necesites después de crear el comentario
      },
      error: (err) => {
        console.error('Error al crear comentario:', err);
        // Manejo del error, por ejemplo, mostrando un mensaje al usuario
      }
    });
  }

  private getCurrentPublicationId(): number {
    // Replace with actual logic to fetch the current publication ID
    return 1; // Example publication ID
  }

  private getCurrentUserId(): number {
    // Replace with actual logic to fetch the logged-in user's ID
    return 1; // Example user ID
  }
}
