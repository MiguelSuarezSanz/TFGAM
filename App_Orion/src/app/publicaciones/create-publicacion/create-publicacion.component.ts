import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PublicacionCreateDTO } from '../publicacion';

@Component({
  selector: 'app-create-publicacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './create-publicacion.component.html',
  styleUrls: ['./create-publicacion.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatePublicacionComponent implements OnInit {
  publicacion: PublicacionCreateDTO = {
    Titulo: '',
    Contenido: '',
    Imagen: '',
    FechaPubl: new Date(),
    Id_Usuario: 0
  };

  // Ensure OnSubmit emits the correct type
  @Output() OnSubmit = new EventEmitter<PublicacionCreateDTO>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Added the 'cancel' method to handle the cancel action
  cancel() {
    this.router.navigate(['/publicaciones']);
  }

  // Add missing properties
  saveChange(): void {
    this.OnSubmit.emit(this.publicacion);
  }
}
