import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComentarioDTO } from '../comentario';
import { ComentariosService } from '../comentarios.service';
import { CreateComentarioComponent } from '../create-comentario/create-comentario.component';

@Component({
  selector: 'app-list-comentarios',
  standalone: true,
  imports: [CommonModule, CreateComentarioComponent],
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent implements OnInit {
  @Input() idPublicacion: number = 0;
  @Input() idUsuarioActual: number = 0;

  comentarios: ComentarioDTO[] = [];
  errors: string[] = [];

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
}
