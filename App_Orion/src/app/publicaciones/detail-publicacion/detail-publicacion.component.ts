import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionesService } from '../publicaciones.service';
import { PublicacionDTO } from '../publicacion';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComentarioDTO } from '../../comentarios/comentario';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ListComentariosComponent } from '../../comentarios/list-comentarios/list-comentarios.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getCurrentUser } from '../../utilidades/utilidades';

@Component({
  selector: 'app-detail-publicacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatButtonModule, ListComentariosComponent],
  templateUrl: './detail-publicacion.component.html',
  styleUrls: ['./detail-publicacion.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailPublicacionComponent implements OnInit {
  publicacion!: PublicacionDTO;
  comentarios: ComentarioDTO[] = [];
  errors: string[] = [];

  // Added properties for current user ID and admin status
  idUsuarioActual: number = 0; // Replace with actual logic to fetch current user ID
  isAdmin: boolean = false; // Replace with actual logic to determine admin status

  constructor(
    private publicacionesService: PublicacionesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Ensure id is validated before calling the service
  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    if (isNaN(id)) {
        console.error('El parámetro idPublicacion debe ser un número válido.');
        this.errors = ['El parámetro idPublicacion debe ser un número válido.'];
        return;
    }

    this.publicacionesService.getPublicacionConComentarios(id).subscribe({
      next: (data) => {
        this.publicacion = data;
        this.comentarios = data.comentarios || []; // Fetch comments directly from publication details
      },
      error: (err) => {
        console.error('Error al cargar publicación:', err);
        this.errors = ['Error al cargar la publicación.'];
      }
    });

    // Initialize user ID and admin status
    const currentUser = getCurrentUser();
    this.idUsuarioActual = currentUser?.Id || 0; // Safely handle null values
    this.isAdmin = this.verificarAdmin();
  }

  private verificarAdmin(): boolean {
    // Replace with actual logic to determine admin status
    return true; // Example value
  }

  borrarPublicacion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      this.publicacionesService.eliminar(id).subscribe({
        next: () => {
          this.router.navigate(['/publicaciones']);
        },
        error: (err) => {
          console.error('Error al eliminar la publicación:', err);
          alert('Error al eliminar la publicación.');
        }
      });
    }
  }
}
