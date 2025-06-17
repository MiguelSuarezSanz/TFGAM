import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentariosService } from '../comentarios.service';
import { ComentarioCreateDTO, ComentarioDTO } from '../comentario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-comentario',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './edit-comentario.component.html',
  styleUrls: ['./edit-comentario.component.css']
})
export class EditComentarioComponent implements OnInit {
  comentario!: ComentarioCreateDTO;

  constructor(
    private comentariosService: ComentariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarComentario();
  }

  cargarComentario(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.comentariosService.obtenerPorPublicacion(id).subscribe({
      next: (comentarios: ComentarioDTO[]) => {
        if (comentarios.length > 0) {
          this.comentario = comentarios[0];
        } else {
          console.error('No se encontraron comentarios para la publicación.');
        }
      },
      error: (err: any) => {
        console.error('Error al cargar comentario:', err);
      }
    });
  }

  guardarCambios(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.comentariosService.editar(id, this.comentario).subscribe({
      next: () => {
        this.router.navigate(['/comentarios']);
      },
      error: (err) => {
        console.error('Error al guardar cambios:', err);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/comentarios']);
  }
}
