import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionCreateDTO } from '../publicacion';
import { PublicacionesService } from '../publicaciones.service';
import { parseErrorsApi } from '../../utilidades/utilidades';
import { FormPublicacionComponent } from '../form-publicacion/form-publicacion.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-publicacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormPublicacionComponent],
  templateUrl: './create-publicacion.component.html',
  styleUrls: ['./create-publicacion.component.css']
})
export class CreatePublicacionComponent implements OnInit {
  constructor(private publicacionesService: PublicacionesService, private router: Router) {}

  errors: string[] = [];

  ngOnInit(): void {}

  saveChange(publicacion: PublicacionCreateDTO) {
    this.publicacionesService.crear(publicacion).subscribe({
      next: (id: number) => {
        console.log("Publicación creada con éxito, ID:", id);
        this.router.navigate(['publicaciones/' + id]);
      },
      error: (err: any) => {
        console.error("Error al crear publicación:", err);
        if (err.status === 422) {
          this.errors = err.error.detail;
        } else {
          this.errors = ['Error inesperado al crear la publicación.'];
        }
      }
    });
  }
}
