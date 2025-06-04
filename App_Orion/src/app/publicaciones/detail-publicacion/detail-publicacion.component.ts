import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionesService } from '../publicaciones.service';
import { PublicacionDTO } from '../publicacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-publicacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-publicacion.component.html',
  styleUrls: ['./detail-publicacion.component.css']
})
export class DetailPublicacionComponent implements OnInit {
  constructor(
    private publicacionesService: PublicacionesService,
    private activatedRoute: ActivatedRoute
  ) {}

  publicacion: PublicacionDTO | undefined; 

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.publicacionesService.obtenerPorId(id).subscribe({
      next: (publicacion: PublicacionDTO) => {
        this.publicacion = publicacion;
      },
      error: (err: any) => {
        console.error("Error al cargar detalles de la publicación:", err);
      }
    });
  }
}
