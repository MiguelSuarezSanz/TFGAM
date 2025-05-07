export interface UserCreateDTO {
    nombre: string,
    email: string,
    fechaNacimiento: Date,
    password: string,
    perfil: string,
    privilegios: string, 
    bloqueado: string
}

export interface UserDTO{
    id: number,
    nombre: string,
    email: string,
    fechaNacimiento: Date,
    password: string,
    perfil: string,
    privilegios: string, 
    bloqueado: string
}
