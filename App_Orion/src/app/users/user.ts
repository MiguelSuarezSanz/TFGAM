export interface UserCreateDTO {
    Nombre: string;
    Email: string;
    FechaNacimiento: Date;
    Password: string;
    Perfil: string;
    Privilegios: string;
    Bloqueado: boolean;
}

export interface UserDTO{
    Id: number,
    Nombre: string,
    Email: string,
    FechaNacimiento: Date,
    Password: string,
    Perfil: string;
    Privilegios: string, 
    Bloqueado: string
}

export interface UserLoginDTO{
    Email: string,
    Password: string,
}

export interface credencialesUsuario{
    Email: string;
    Password: string;
}

export interface respuestaAutenticacion{
    token: string;
    expiracion: Date;
}

// Add default profile image logic
export const DEFAULT_PROFILE_IMAGE = 'assets/images/placeholder.png';