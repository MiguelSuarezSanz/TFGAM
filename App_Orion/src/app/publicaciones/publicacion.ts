import { ComentarioDTO } from '../comentarios/comentario'; // Added missing import for ComentarioDTO

export interface PublicacionDTO {
  Id: number;
  Titulo: string;
  Contenido: string;
  Imagen?: string;
  FechaPubl: Date;
  Likes: number;
  Dislikes: number;
  usuario: {
    Id: number;
    Nombre: string;
    FotoPerfil: string;
  };
  comentarios?: ComentarioDTO[]; // Added comentarios property
}

export interface PublicacionCreateDTO {
  Titulo: string;
  Contenido: string;
  Imagen?: string;
  FechaPubl: Date;
  Id_Usuario: number;
}