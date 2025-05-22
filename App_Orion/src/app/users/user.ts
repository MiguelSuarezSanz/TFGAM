export interface UserCreateDTO {
    Nombre: string,
    Email: string,
    FechaNacimiento: Date,
    Password: string,
    Perfil: string,
    Privilegios: string, 
    Bloqueado: string
}

export interface UserDTO{
    Id: number,
    Nombre: string,
    Email: string,
    FechaNacimiento: Date,
    Password: string,
    Perfil: string,
    Privilegios: string, 
    Bloqueado: string
}
