export interface ComentarioCreateDTO {
  Id_Usuario: number;
  Id_Publicacion: number;
  Contenido: string;
  Fecha: Date;
}

export interface ComentarioDTO {
  Id: number;
  Id_Usuario: number;
  Id_Publicacion: number;
  Contenido: string;
  Fecha: Date;
  Usuario?: {
    Id: number;
    Nombre: string;
    FotoPerfil?: string;
  };
}