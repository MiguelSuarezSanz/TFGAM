import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioDTO, ComentarioCreateDTO } from './comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private apiURL = 'http://localhost:8000/comentarios';

  constructor(private http: HttpClient) {}

  obtenerPorPublicacion(idPublicacion: number): Observable<ComentarioDTO[]> {
    return this.http.get<ComentarioDTO[]>(`${this.apiURL}/publicacion/${idPublicacion}`);
  }

  crear(comentario: ComentarioCreateDTO): Observable<ComentarioDTO> {
    const now = new Date();
    // Formatear la fecha como YYYY-MM-DD
    comentario.Fecha = now.toISOString().split('T')[0];
    // No sobreescribir Id_Usuario ni Id_Publicacion, se pasan correctamente desde el componente
    return this.http.post<ComentarioDTO>(this.apiURL, comentario);
  }

  editar(id: number, comentario: ComentarioCreateDTO): Observable<ComentarioDTO> {
    return this.http.put<ComentarioDTO>(`${this.apiURL}/${id}`, comentario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  obtenerPorId(id: number): Observable<ComentarioDTO> {
    return this.http.get<ComentarioDTO>(`${this.apiURL}/${id}`);
  }

  private getCurrentPublicationId(): number {
    const url = window.location.href;
    const match = url.match(/publicacion\/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  private getCurrentUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.id || 0;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    return 0;
  }
}