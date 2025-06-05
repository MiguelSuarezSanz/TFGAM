import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionDTO, PublicacionCreateDTO } from '../publicacion';
import { PublicacionesService } from '../publicaciones.service';
import { parseErrorsApi } from '../../utilidades/utilidades';
import { FormPublicacionComponent } from '../form-publicacion/form-publicacion.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-publicacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormPublicacionComponent],
  templateUrl: './edit-publicacion.component.html',
  styleUrls: ['./edit-publicacion.component.css']
})
export class EditPublicacionComponent implements OnInit {
  constructor(
    private publicacionesService: PublicacionesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  publicacion: PublicacionDTO = {
    Id: 0, // Replace with appropriate default values
    Titulo: '',
    Contenido: '',
    Imagen: '',
    FechaPubl: new Date().toISOString(), // Default to the current date as ISO string
    Id_Usuario: 0, // Default value for user ID
    Usuario_Nombre: '' // Default value for user name
  };
  errors: string[] = [];

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.publicacionesService.obtenerPorId(id).subscribe({
      next: (publicacion: PublicacionDTO) => {
        this.publicacion = publicacion;
      },
      error: (err: any) => {
        console.error("Error al cargar publicación:", err);
      }
    });
  }

  saveChange(publicacion: PublicacionCreateDTO) {
    const id = this.activatedRoute.snapshot.params['id'];
    this.publicacionesService.editar(id, publicacion).subscribe({
      next: () => {
        console.log("Publicación editada con éxito");
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
}
