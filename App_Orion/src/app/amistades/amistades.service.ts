import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Amistad {
  id: number;
  usuario_id_1: number;
  usuario_id_2: number;
  fecha_solicitud: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class AmistadesService {
  private apiURL = 'http://localhost:8000/amistades';

  constructor(private http: HttpClient) {}

  obtenerAmistades(): Observable<Amistad[]> {
    return this.http.get<Amistad[]>(this.apiURL);
  }

  crearAmistad(amistad: Amistad): Observable<Amistad> {
    return this.http.post<Amistad>(this.apiURL, amistad);
  }

  actualizarEstado(id: number, estado: string): Observable<Amistad> {
    return this.http.put<Amistad>(`${this.apiURL}/${id}`, { estado });
  }

  obtenerAmistadesPorUsuario(userId: number): Observable<Amistad[]> {
    return this.http.get<Amistad[]>(`${this.apiURL}/${userId}`);
  }
}