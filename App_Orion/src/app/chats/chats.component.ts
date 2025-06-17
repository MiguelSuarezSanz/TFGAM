import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChatsService, Mensaje } from './chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  imports: [BrowserModule, FormsModule],
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  private websocket!: WebSocket;
  public messages: string[] = [];
  public newMessage: string = '';
  mensajes: Mensaje[] = [];
  nuevoMensaje: string = '';
  chatId: number = 1; // Example chat ID, replace with dynamic logic

  constructor(private chatsService: ChatsService) {}

  ngOnInit(): void {
    this.connectWebSocket();
  }

  connectWebSocket(): void {
    this.websocket = new WebSocket('ws://localhost:8000/ws/chat/1');

    this.websocket.onmessage = (event) => {
      this.messages.push(event.data);
    };

    this.websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.websocket.send(this.newMessage);
      this.newMessage = '';
    }
  }

  cargarMensajes(chatId: number): void {
    this.chatsService.obtenerMensajes(chatId).subscribe({
      next: (data: Mensaje[]) => {
        this.mensajes = data;
      },
      error: (err: any) => {
        console.error('Error al cargar mensajes:', err);
      }
    });
  }

  enviarMensaje(chatId: number, contenido: string): void {
    this.chatsService.enviarMensaje(chatId, contenido).subscribe({
      next: (data: Mensaje) => {
        this.mensajes.push(data);
      },
      error: (err: any) => {
        console.error('Error al enviar mensaje:', err);
      }
    });
  }
}