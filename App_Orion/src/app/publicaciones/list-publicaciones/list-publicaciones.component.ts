import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../publicaciones.service';
import { PublicacionDTO } from '../publicacion'; // Ensure the path is correct
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-publicaciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-publicaciones.component.html',
  styleUrls: ['./list-publicaciones.component.css']
})
export class ListPublicacionesComponent implements OnInit {
  constructor(private publicacionesService: PublicacionesService) {}

  publicaciones: PublicacionDTO[] = [];

  ngOnInit(): void {
    this.publicacionesService.obtenerTodos().subscribe({
      next: (publicaciones: PublicacionDTO[]) => {
        this.publicaciones = publicaciones;
      },
      error: (err: any) => {
        console.error("Error al cargar publicaciones:", err);
      }
    });
  }
}
