import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from './comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private apiUrl = 'http://localhost:3000/comentarios';

  constructor(private http: HttpClient) {}

  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl);
  }

  getComentario(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.apiUrl}/${id}`);
  }

  createComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.apiUrl, comentario);
  }

  updateComentario(id: number, comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}/${id}`, comentario);
  }

  deleteComentario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}