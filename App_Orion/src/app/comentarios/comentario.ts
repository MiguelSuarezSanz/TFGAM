export interface ComentarioDTO {
  id: number;
  contenido: string;
  fecha: Date;
  idPublicacion: number;
  idUsuario: number;
  Usuario_Nombre: string; // Add this field to match the backend response
}

export interface ComentarioCreateDTO {
  contenido: string;
  fecha: Date;
  idPublicacion: number;
  idUsuario: number;
}