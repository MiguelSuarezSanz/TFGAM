import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ComentariosService } from '../comentarios.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComentarioCreateDTO } from '../comentario';
import { FormComentarioComponent } from "../form-comentario/form-comentario.component";

@Component({
  selector: 'app-create-comentario',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormComentarioComponent
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
    Fecha: new Date().toISOString(),
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
      this.modeloInicial.Fecha = new Date().toISOString();
    }

    this.comentariosService.crear(this.modeloInicial).subscribe({
      next: () => {
        console.log('Comentario creado exitosamente');
      },
      error: (err) => {
        console.error('Error al crear comentario:', err);
      }
    });
  }

  private getCurrentPublicationId(): number {
    // Replace with actual logic to fetch the current publication ID
    return 1; // Example publication ID
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
}
