import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-index',
  imports: [],
  templateUrl: './character-index.component.html',
  styleUrl: './character-index.component.css'
})
export class CharacterIndexComponent implements OnInit {
  tabs = [
    { id: 'personales', label: 'Datos Personales', content: 'Contenido de Datos Personales.' },
    { id: 'combate', label: 'Combate', content: 'Contenido de Combate.' },
    { id: 'epicos', label: 'Momentos Epicos', content: 'Contenido de Momentos Épicos.' },
    { id: 'pasivas', label: 'Pasivas', content: 'Contenido de Pasivas.' },
    { id: 'inventario', label: 'Inventario', content: 'Contenido del Inventario.' },
    { id: 'estado', label: 'Efectos de estado', content: 'Contenido de Efectos de Estado.' }
  ];

  activeTab: string = this.tabs[0].id; // Establecer la primera pestaña como activa por defecto

  constructor() { }

  ngOnInit(): void {
    // No es necesario manipular el DOM directamente con Renderer2 aquí,
    // Angular se encarga de la renderización condicional con [ngClass] y *ngIf.
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }
}