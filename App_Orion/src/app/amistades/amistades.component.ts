import { Component, OnInit } from '@angular/core';
import { AmistadesService, Amistad } from './amistades.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-amistades',
  templateUrl: './amistades.component.html',
  imports: [BrowserModule, FormsModule],
  styleUrls: ['./amistades.component.css']
})
export class AmistadesComponent implements OnInit {
  amistades: Amistad[] = [];
  nuevaAmistad: Amistad = { id: 0, usuario_id_1: 0, usuario_id_2: 0, fecha_solicitud: '', estado: 'pendiente' };

  constructor(private amistadesService: AmistadesService) {}

  ngOnInit(): void {
    this.cargarAmistades();
  }

  cargarAmistades(): void {
    this.amistadesService.obtenerAmistades().subscribe({
      next: (data: Amistad[]) => {
        this.amistades = data;
      },
      error: (err: any) => {
        console.error('Error al cargar amistades:', err);
      }
    });
  }

  crearAmistad(): void {
    this.amistadesService.crearAmistad(this.nuevaAmistad).subscribe({
      next: (data: Amistad) => {
        this.amistades.push(data);
        this.nuevaAmistad = { id: 0, usuario_id_1: 0, usuario_id_2: 0, fecha_solicitud: '', estado: 'pendiente' };
      },
      error: (err: any) => {
        console.error('Error al crear amistad:', err);
      }
    });
  }

  aceptarAmistad(id: number): void {
    this.amistadesService.actualizarEstado(id, 'aceptada').subscribe({
      next: () => {
        const amistad = this.amistades.find(a => a.id === id);
        if (amistad) {
          amistad.estado = 'aceptada';
        }
      },
      error: (err: any) => {
        console.error('Error al aceptar amistad:', err);
      }
    });
  }

  rechazarAmistad(id: number): void {
    this.amistadesService.actualizarEstado(id, 'rechazada').subscribe({
      next: () => {
        this.amistades = this.amistades.filter(a => a.id !== id);
      },
      error: (err: any) => {
        console.error('Error al rechazar amistad:', err);
      }
    });
  }
}