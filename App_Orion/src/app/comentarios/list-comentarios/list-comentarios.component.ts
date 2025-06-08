import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComentarioCreateDTO, ComentarioDTO } from '../comentario';
import { ComentariosService } from '../comentarios.service';
import { CreateComentarioComponent } from '../create-comentario/create-comentario.component';

@Component({
  selector: 'app-list-comentarios',
  standalone: true,
  imports: [CommonModule, CreateComentarioComponent, FormsModule],
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent implements OnInit {
  @Input() idPublicacion: number = 0;
  @Input() idUsuarioActual: number = 0;

  comentarios: ComentarioDTO[] = [];
  errors: string[] = [];
  newComment: string = '';

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.comentariosService.obtenerPorPublicacion(this.idPublicacion).subscribe({
      next: (comentarios) => {
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

    const comentario: ComentarioCreateDTO = {
      contenido: this.newComment,
      idPublicacion: this.idPublicacion,
      idUsuario: this.idUsuarioActual,
      fecha: new Date(),
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
}
