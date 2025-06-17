import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chat {
  id: number;
  nombre: string;
}

export interface Mensaje {
  id: number;
  contenido: string;
  chatId: number;
  fechaMensaje: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  private apiURL = 'http://localhost:8000/chats';

  constructor(private http: HttpClient) {}

  obtenerChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.apiURL);
  }

  crearChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(this.apiURL, chat);
  }

  obtenerMensajes(chatId: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.apiURL}/${chatId}/mensajes`);
  }

  enviarMensaje(chatId: number, contenido: string): Observable<Mensaje> {
    return this.http.post<Mensaje>(`${this.apiURL}/${chatId}/mensajes`, { contenido });
  }
}