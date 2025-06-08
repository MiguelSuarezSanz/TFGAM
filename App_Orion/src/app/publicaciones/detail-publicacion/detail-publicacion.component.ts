import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionesService } from '../publicaciones.service';
import { PublicacionDTO } from '../publicacion';
import { CommonModule } from '@angular/common';
import { ComentariosService } from '../../comentarios/comentarios.service';
import { HttpClientModule } from '@angular/common/http';
import { ComentarioDTO } from '../../comentarios/comentario';

@Component({
  selector: 'app-detail-publicacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './detail-publicacion.component.html',
  styleUrls: ['./detail-publicacion.component.css']
})
export class DetailPublicacionComponent implements OnInit {
  publicacion!: PublicacionDTO;
  comentarios: ComentarioDTO[] = [];
  errors: string[] = [];

  constructor(
    private publicacionesService: PublicacionesService,
    private comentariosService: ComentariosService,
    private route: ActivatedRoute
  ) {}

  // Ensure id is validated before calling the service
  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    if (isNaN(id)) {
        console.error('El parámetro idPublicacion debe ser un número válido.');
        this.errors = ['El parámetro idPublicacion debe ser un número válido.'];
        return;
    }

    this.publicacionesService.obtenerPorId(id).subscribe({
      next: (data) => {
        this.publicacion = data;
      },
      error: (err) => {
        console.error('Error al cargar publicación:', err);
      }
    });

    this.comentariosService.obtenerPorPublicacionId(id).subscribe({
      next: (data) => {
        this.comentarios = data;
      },
      error: (err) => {
        console.error('Error al cargar comentarios:', err);
        this.errors = ['Error al cargar los comentarios.'];
      }
    });
  }
}
