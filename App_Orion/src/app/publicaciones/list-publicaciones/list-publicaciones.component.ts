import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../publicaciones.service';
import { PublicacionDTO } from '../publicacion'; // Ensure the path is correct
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComentariosService } from '../../comentarios/comentarios.service';
import { ComentarioDTO } from '../../comentarios/comentario';

@Component({
  selector: 'app-list-publicaciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-publicaciones.component.html',
  styleUrls: ['./list-publicaciones.component.css']
})
export class ListPublicacionesComponent implements OnInit {
  constructor(
    private publicacionesService: PublicacionesService,
    private comentariosService: ComentariosService
  ) {}

  publicaciones: PublicacionDTO[] = [];
  comentariosPorPublicacion: { [key: number]: ComentarioDTO[] } = {};

  ngOnInit(): void {
    this.publicacionesService.obtenerTodos().subscribe({
      next: (publicaciones: PublicacionDTO[]) => {
        this.publicaciones = publicaciones;
        this.cargarComentarios();
      },
      error: (err: any) => {
        console.error("Error al cargar publicaciones:", err);
      }
    });
  }

  private cargarComentarios(): void {
    this.publicaciones.forEach((publicacion) => {
      if (!publicacion.Id) {
        console.warn(`Publicación sin ID encontrada:`, publicacion);
        return;
      }
      this.comentariosService.obtenerPorPublicacionId(publicacion.Id).subscribe({
        next: (comentarios: ComentarioDTO[]) => {
          this.comentariosPorPublicacion[publicacion.Id] = comentarios.slice(0, 3);
        },
        error: (err: any) => {
          console.error(`Error al cargar comentarios para la publicación ${publicacion.Id}:`, err);
        }
      });
    });
  }

  navigateToCreatePublicacion(): void {
    // Navigate to the create publication page
    console.log('Navigating to create publication page');
  }
}
