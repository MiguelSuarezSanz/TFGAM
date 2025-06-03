export interface PublicacionDTO {
  id: number;
  titulo: string;
  contenido: string;
  imagen?: string;
  fechaPubl: string;
}

export interface PublicacionCreateDTO {
  titulo: string;
  contenido: string;
  imagen?: string;
}