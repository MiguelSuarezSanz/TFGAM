import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComentarioCreateDTO, ComentarioDTO } from '../comentario';
import { ComentariosService } from '../comentarios.service';
import { CreateComentarioComponent } from '../create-comentario/create-comentario.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-comentarios',
  standalone: true,
  imports: [CommonModule, CreateComentarioComponent, FormsModule, MatButtonModule, MatCardModule],
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListComentariosComponent implements OnInit {
  @Input() idPublicacion: number = 0; // Ensure idPublicacion is properly defined
  @Input() comentarios: ComentarioDTO[] = [];

  errors: string[] = [];
  newComment: string = '';

  idUsuarioActual: number = 0; // Replace with actual logic to fetch current user ID
  isAdmin: boolean = false; // Replace with actual logic to determine admin status

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.comentariosService.obtenerPorPublicacion(this.idPublicacion).subscribe({
      next: (comentarios) => {
        comentarios.forEach(comentario => {
          comentario.Usuario = {
            Id: comentario.Id_Usuario,
            Nombre: comentario.Usuario?.Nombre || 'Usuario Anónimo', 
            FotoPerfil: comentario.Usuario?.FotoPerfil || 'default-avatar.png'
          };
        });
        this.comentarios = comentarios;
      },
      error: (err) => {
        console.error('Error al cargar comentarios:', err);
        this.errors = ['Error al cargar los comentarios.'];
      }
    });
  }

  eliminarComentario(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este comentario?')) {
      this.comentariosService.eliminar(id).subscribe({
        next: () => {
          this.cargarComentarios();
        },
        error: (err) => {
          console.error('Error al eliminar comentario:', err);
          this.errors = ['Error al eliminar el comentario.'];
        }
      });
    }
  }

  addComment() {
    if (!this.newComment.trim()) {
      this.errors = ['El comentario no puede estar vacío.'];
      return;
    }

    const now = new Date();
    const comentario: ComentarioCreateDTO = {
      Contenido: this.newComment,
      Id_Publicacion: this.idPublicacion,
      Id_Usuario: this.idUsuarioActual,
      Fecha: new Date(`${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`), // Convert string to Date
    };

    this.comentariosService.crear(comentario).subscribe({
      next: () => {
        this.newComment = '';
        this.cargarComentarios();
      },
      error: (err) => {
        console.error('Error al añadir comentario:', err);
        this.errors = ['Error al añadir el comentario.'];
      }
    });
  }

  editarComentario(id: number): void {
    console.log('Editar comentario con ID:', id);
  }

  borrarComentario(id: number): void {
    console.log('Borrar comentario con ID:', id);
  }
}
