import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionDTO, PublicacionCreateDTO } from '../publicacion';
import { PublicacionesService } from '../publicaciones.service';
import { parseErrorsApi } from '../../utilidades/utilidades';
import { FormPublicacionComponent } from '../form-publicacion/form-publicacion.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-edit-publicacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormPublicacionComponent, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './edit-publicacion.component.html',
  styleUrls: ['./edit-publicacion.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditPublicacionComponent implements OnInit {
  publicacion!: PublicacionCreateDTO;
  errors: string[] = [];

  constructor(
    private publicacionesService: PublicacionesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarPublicacion();
  }

  cargarPublicacion(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.publicacionesService.obtenerPorId(id).subscribe({
      next: (publicacion: PublicacionDTO) => {
        this.publicacion = {
          ...publicacion,
          Id_Usuario: publicacion.usuario.Id
        };
      },
      error: (err: any) => {
        console.error("Error al cargar publicación:", err);
      }
    });
  }

  guardarCambios(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.publicacionesService.editar(id, this.publicacion).subscribe({
      next: () => {
        this.router.navigate(['publicaciones/' + id]);
      },
      error: (err: any) => {
        console.error("Error al editar publicación:", err);
        if (err.status === 422) {
          this.errors = err.error.detail;
        } else {
          this.errors = ['Error inesperado al editar la publicación.'];
        }
      }
    });
  }

  cancelar(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.router.navigate(['publicaciones/' + id]);
  }

  // Add missing properties
  saveChange(event: PublicacionCreateDTO): void {
    console.log('Save change:', event);
  }
}
