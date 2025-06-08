export interface PublicacionDTO {
  Id: number;
  Titulo: string;
  Contenido: string;
  Imagen?: string;
  FechaPubl: string;
  Id_Usuario: number; 
  Usuario_Nombre: string; 
}

export interface PublicacionCreateDTO {
  Titulo: string; 
  Contenido: string; 
  Imagen?: string; 
}