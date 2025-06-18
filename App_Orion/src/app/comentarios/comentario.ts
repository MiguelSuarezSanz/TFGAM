export interface ComentarioCreateDTO {
  Id_Usuario: number;
  Id_Publicacion: number;
  Contenido: string;
  Fecha: string;
}

export interface ComentarioDTO {
  Id: number;
  Id_Usuario: number;
  Id_Publicacion: number;
  Contenido: string;
  Fecha: string;
  Usuario?: {
    Id: number;
    Nombre: string;
    FotoPerfil?: string;
  };
}