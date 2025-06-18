import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentariosService } from '../comentarios.service';
import { ComentarioDTO, ComentarioCreateDTO } from '../comentario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormComentarioComponent } from '../form-comentario/form-comentario.component';

@Component({
  selector: 'app-edit-comentario',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, FormComentarioComponent],
  templateUrl: './edit-comentario.component.html',
  styleUrls: ['./edit-comentario.component.css']
})
export class EditComentarioComponent implements OnInit {
  comentarioId!: number;
  comentario!: ComentarioDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comentariosService: ComentariosService
  ) {}

  ngOnInit(): void {
    this.comentarioId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadComentario();
  }

  loadComentario(): void {
    this.comentariosService.obtenerPorId(this.comentarioId).subscribe({
      next: (comentario: ComentarioDTO) => {
        this.comentario = comentario;
      },
      error: (err: any) => {
        console.error('Error loading comentario:', err);
      }
    });
  }

  saveChanges(updatedComentario: ComentarioCreateDTO): void {
    this.comentariosService.editar(this.comentarioId, updatedComentario).subscribe({
      next: () => {
        console.log('Comentario updated successfully');
        this.router.navigate(['/comentarios']);
      },
      error: (err) => {
        console.error('Error updating comentario:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/comentarios']);
  }
}
