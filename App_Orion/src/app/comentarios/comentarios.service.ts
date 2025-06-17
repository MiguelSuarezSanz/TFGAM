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
    // Automatically set the current date as an exact date
    comentario.Fecha = new Date();

    // Ensure the logged-in user's ID is included
    comentario.Id_Usuario = this.getCurrentUserId();

    // Ensure the publication ID is included
    comentario.Id_Publicacion = this.getCurrentPublicationId();

    return this.http.post<ComentarioDTO>(this.apiURL, comentario);
  }

  editar(id: number, comentario: ComentarioCreateDTO): Observable<ComentarioDTO> {
    return this.http.put<ComentarioDTO>(`${this.apiURL}/${id}`, comentario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  private getCurrentPublicationId(): number {
    // Replace with actual logic to fetch the current publication ID
    return 1; // Example publication ID
  }

  private getCurrentUserId(): number {
    // Replace with actual logic to fetch the logged-in user's ID
    return 1; // Example user ID
  }
}