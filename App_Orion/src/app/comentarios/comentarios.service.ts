import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ComentarioDTO, ComentarioCreateDTO } from './comentario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private apiURL = environment.apiURL + 'comentarios';

  constructor(private http: HttpClient) {}

  crear(comentario: ComentarioCreateDTO): Observable<number> {
    // Simplified error handling
    return this.http.post<number>(this.apiURL, comentario).pipe(
      catchError((error) => {
        console.log('Error al crear comentario:', error);
        alert('Error al crear comentario');
        return throwError(() => new Error('Error al crear comentario'));
      })
    );
  }

  obtenerPorId(id: number): Observable<ComentarioDTO> {
    return this.http.get<ComentarioDTO>(`${this.apiURL}/${id}`);
  }

  obtenerPorPublicacion(idPublicacion: number): Observable<ComentarioDTO[]> {
    return this.http.get<ComentarioDTO[]>(`${this.apiURL}/publicacion/${idPublicacion}`);
  }

  // Ensure publicacionId is validated before constructing the URL
  obtenerPorPublicacionId(idPublicacion: number): Observable<ComentarioDTO[]> {
    if (typeof idPublicacion !== 'number' || isNaN(idPublicacion)) {
        throw new Error('El parámetro idPublicacion debe ser un número válido.');
    }
    return this.http.get<ComentarioDTO[]>(`${this.apiURL}/publicacion/${idPublicacion}`);
  }

  editar(id: number, comentario: ComentarioCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiURL}/${id}`, comentario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}