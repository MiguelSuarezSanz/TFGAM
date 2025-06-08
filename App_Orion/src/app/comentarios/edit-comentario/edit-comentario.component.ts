import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentariosService } from '../comentarios.service';
import { ComentarioCreateDTO } from '../comentario';
import { FormComentarioComponent } from '../form-comentario/form-comentario.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-comentario',
  standalone: true,
  imports: [CommonModule, FormComentarioComponent],
  templateUrl: './edit-comentario.component.html',
  styleUrls: ['./edit-comentario.component.css']
})
export class EditComentarioComponent implements OnInit {
  modelo: ComentarioCreateDTO = {
    contenido: '',
    fecha: new Date(),
    idPublicacion: 0,
    idUsuario: 0
  };

  errors: string[] = [];

  constructor(
    private comentariosService: ComentariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.comentariosService.obtenerPorId(id).subscribe({
      next: (comentario) => {
        this.modelo = comentario;
      },
      error: (err) => {
        console.error('Error al cargar comentario:', err);
        this.errors = ['Error al cargar el comentario.'];
      }
    });
  }

  guardarCambios(comentario: ComentarioCreateDTO): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.comentariosService.editar(id, comentario).subscribe({
      next: () => {
        this.router.navigate(['/comentarios']);
      },
      error: (err) => {
        console.error('Error al guardar cambios:', err);
        if (err.status === 422) {
          this.errors = err.error.detail;
        } else {
          this.errors = ['Error inesperado al guardar los cambios.'];
        }
      }
    });
  }
}
