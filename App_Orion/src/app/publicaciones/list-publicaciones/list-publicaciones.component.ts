import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../publicaciones.service';
import { PublicacionDTO, PublicacionCreateDTO } from '../publicacion'; // Ensure the path is correct
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ComentariosService } from '../../comentarios/comentarios.service';
import { ComentarioDTO } from '../../comentarios/comentario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-publicaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-publicaciones.component.html',
  styleUrls: ['./list-publicaciones.component.css']
})

export class ListPublicacionesComponent implements OnInit {
  publicaciones: PublicacionDTO[] = [];
  idUsuarioActual: number = 0; // Replace with actual logic to fetch current user ID
  isAdmin: boolean = false; // Replace with actual logic to determine admin status
  showModal: boolean = false;

  constructor(
    private publicacionesService: PublicacionesService,
    private comentariosService: ComentariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPublicaciones();
  }

  cargarPublicaciones(): void {
    this.publicacionesService.obtenerTodos().subscribe({
      next: (data) => {
        this.publicaciones = data.map(publicacion => ({
          ...publicacion,
          Contenido: publicacion.Contenido.slice(0, 120)
        }));
      },
      error: (err) => {
        console.error('Error al cargar publicaciones:', err);
      }
    });
  }

  private cargarComentarios(): void {
    console.log('Cargar comentarios logic should be implemented here.');
  }

  editarPublicacion(id: number): void {
    console.log('Editar publicación con ID:', id);
  }

  borrarPublicacion(id: number): void {
    console.log('Borrar publicación con ID:', id);
  }

  openModal(): void {
    console.log('Open modal logic should be implemented here.');
  }

  closeModal(): void {
    console.log('Close modal logic should be implemented here.');
  }

  // Update onCreateSuccess method to handle PublicacionCreateDTO
  onCreateSuccess(event: PublicacionCreateDTO): void {
    console.log('Create success:', event);
    this.publicaciones.push({
      Id: this.publicaciones.length + 1, // Example ID generation
      Titulo: event.Titulo,
      Contenido: event.Contenido,
      Imagen: event.Imagen,
      FechaPubl: event.FechaPubl,
      Likes: 0,
      Dislikes: 0,
      usuario: {
        Id: event.Id_Usuario,
        Nombre: 'Usuario', // Replace with actual logic
        FotoPerfil: 'placeholder.png' // Replace with actual logic
      }
    });
  }
}
