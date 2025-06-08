import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PublicacionDTO, PublicacionCreateDTO } from './publicacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  private apiURL = environment.apiURL + 'publicaciones';

  constructor(private http: HttpClient) {}

  crear(publicacion: PublicacionCreateDTO): Observable<number> {
    // Simplified error handling
    return this.http.post<number>(this.apiURL, publicacion).pipe(
      catchError((error) => {
        console.log('Error al crear publicación:', error);
        alert('Error al crear publicación');
        return throwError(() => new Error('Error al crear publicación'));
      })
    );
  }

  obtenerPorId(id: number): Observable<PublicacionDTO> {
    return this.http.get<PublicacionDTO>(`${this.apiURL}/${id}`);
  }

  editar(id: number, publicacion: PublicacionCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiURL}/${id}`, publicacion);
  }

  obtenerTodos(): Observable<PublicacionDTO[]> {
    return this.http.get<PublicacionDTO[]>(this.apiURL);
  }
}
