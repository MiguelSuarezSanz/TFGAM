export interface PublicacionDTO {
  Id: number;
  Titulo: string;
  Contenido: string;
  Imagen?: string;
  FechaPubl: string;
  Id_Usuario: number; // Added field for user ID
  Usuario_Nombre: string; // Added field for user name
}

export interface PublicacionCreateDTO {
  Titulo: string; // Changed to uppercase
  Contenido: string; // Changed to uppercase
  Imagen?: string; // Changed to uppercase
}