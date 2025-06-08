export interface ComentarioDTO {
  id: number;
  contenido: string;
  fecha: Date;
  idPublicacion: number;
  idUsuario: number;
}

export interface ComentarioCreateDTO {
  contenido: string;
  fecha: Date;
  idPublicacion: number;
  idUsuario: number;
}