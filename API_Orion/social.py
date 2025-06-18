from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from enum import Enum
from datetime import date,datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from jose import JWTError, jwt
import pymysql

app = FastAPI()

SECRET_KEY="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

origins = [
    "http://localhost",
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",  # Explicitly allow the frontend's origin
        "http://127.0.0.1:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

host = "localhost"
user = "admin"
password = "admin"
database = "OrionDB"


def get_db_connection():
    try:
        conn = pymysql.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            port=3306,
            cursorclass=pymysql.cursors.DictCursor 
        )
        return conn
    except pymysql.MySQLError as e:
        raise HTTPException(status_code=500, detail="Error conectando a la base de datos")


class PrivilegiosEnum(str, Enum):
    admin = "Admin"
    user = "Usuario"


class User(BaseModel):
    Id: int
    Nombre: str
    Email: EmailStr
    FechaNacimiento: date
    Privilegios: PrivilegiosEnum
    Bloqueado: bool
    Perfil: Optional[str]

class UserUpdateDTO(BaseModel):
    Nombre: str
    Email: str
    FechaNacimiento: date
    Password: str
    Privilegios: PrivilegiosEnum
    Bloqueado: bool
    Perfil: Optional[str]

class UserCreateDTO(BaseModel):
    Nombre: str
    Email: str  
    FechaNacimiento: date
    Password: str
    Perfil: Optional[str] = None
    Privilegios: str
    Bloqueado: Optional[bool] = False 

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Simplificación de la clase LoginDTO para evitar problemas con Pydantic v2
class LoginDTO(BaseModel):
    Email: EmailStr
    Password: str

    # Las validaciones nativas de Pydantic ya aseguran que Email sea un correo válido
    # y que Password sea una cadena. No se necesita un validador adicional.

# Configuracion de JWT

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# -------------------- Usuarios --------------------

# GET: obtener todos los usuarios
@app.get("/users", response_model=List[User])
async def get_users():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM Usuarios")
            rows = cursor.fetchall()
            return [User(**row) for row in rows]
    finally:
        conn.close()

# Get: Obtener usaurio por id
@app.get("/users/{user_id}", response_model=User)
async def get_user_id(user_id: int):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM Usuarios WHERE Id = %s"
            cursor.execute(sql, (user_id,))
            row = cursor.fetchone()

            if row is None:
                raise HTTPException(status_code=404, detail="Usuario no encontrado")

            return User(**row)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    finally:
        conn.close()

# POST: crear un nuevo usuario
@app.post("/users", response_model=UserCreateDTO)
async def create_user(user: UserCreateDTO):
    
    user.Perfil = user.Perfil or "public/assets/FotoPreterminada.png"
    user.Bloqueado = user.Bloqueado if user.Bloqueado is not None else False

    # Validar que la fecha de nacimiento sea una fecha válida
    if isinstance(user.FechaNacimiento, str):
        try:
            user.FechaNacimiento = datetime.strptime(user.FechaNacimiento, "%Y-%m-%d").date()
        except ValueError:
            raise HTTPException(status_code=422, detail="FechaNacimiento debe ser una fecha válida en formato YYYY-MM-DD.")

    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            hashed_password = get_password_hash(user.Password)
            sql = """
                INSERT INTO Usuarios (Id, Nombre, Email, FechaNacimiento, Perfil, Privilegios, Bloqueado, Password)
                VALUES (Null, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
                user.Nombre,
                user.Email,
                user.FechaNacimiento,
                user.Perfil,
                user.Privilegios,
                user.Bloqueado,
                hashed_password,
            ))

            conn.commit()
            return user
    except pymysql.MySQLError as e:
        if "Duplicate entry" in str(e):
            raise HTTPException(status_code=422, detail="El correo electrónico ya está registrado.")
        print("Error de base de datos:", e)
        raise HTTPException(status_code=500, detail="Error interno del servidor.")
    finally:
        conn.close()

# PUT: actualizar un usuario existente
@app.put("/users/{user_id}", response_model=UserUpdateDTO)
async def update_user(user_id: int, user: UserUpdateDTO):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            hashed_password = get_password_hash(user.Password) if user.Password else None
            sql = """
                UPDATE Usuarios
                SET Nombre = %s,
                    Email = %s,
                    FechaNacimiento = %s,
                    Perfil = %s,
                    Privilegios = %s,
                    Bloqueado = %s,
                    Password = COALESCE(%s, Password)  # Use existing password if none provided
                WHERE Id = %s
            """
            cursor.execute(sql, (
                user.Nombre,
                user.Email,
                user.FechaNacimiento,
                user.Perfil,
                user.Privilegios,
                user.Bloqueado,
                hashed_password,
                user_id
            ))

            if cursor.rowcount == 0:
                raise HTTPException(status_code=404, detail="Usuario no encontrado")

            conn.commit()

            # Fetch the updated user details
            cursor.execute("SELECT * FROM Usuarios WHERE Id = %s", (user_id,))
            updated_user = cursor.fetchone()

            if not updated_user:
                raise HTTPException(status_code=404, detail="Usuario no encontrado después de la actualización")

            return UserUpdateDTO(**updated_user)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    finally:
        conn.close()

# DELETE: eliminar un usuario
@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Verificar si el usuario existe
            sql_check = "SELECT Id FROM Usuarios WHERE Id = %s"
            cursor.execute(sql_check, (user_id,))
            user = cursor.fetchone()

            if not user:
                raise HTTPException(status_code=404, detail="Usuario no encontrado")

            # Eliminar el usuario
            sql_delete = "DELETE FROM Usuarios WHERE Id = %s"
            cursor.execute(sql_delete, (user_id,))
            conn.commit()

            return {"message": "Usuario eliminado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    finally:
        conn.close()

# POST: iniciar sesión
@app.post("/users/login")
async def login(user: LoginDTO):
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql = "SELECT * FROM Usuarios WHERE Email = %s"
            cursor.execute(sql, (user.Email,))
            row = cursor.fetchone()

            if row is None:
                raise HTTPException(status_code=401, detail="Credenciales inválidas")

            if not verify_password(user.Password, row['Password']):
                raise HTTPException(status_code=401, detail="Credenciales inválidas")

            access_token = create_access_token(data={"sub": row['Email']})
            return {"access_token": access_token, "token_type": "bearer", "user": row}
    except pymysql.MySQLError as db_error:
        raise HTTPException(status_code=500, detail="Error conectando a la base de datos")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    finally:
        if 'conn' in locals() and conn.open:
            conn.close()

# -------------------- Publicaciones --------------------

class Publicacion(BaseModel):
    Id: int
    Titulo: str
    Contenido: str
    Imagen: Optional[str]
    FechaPubl: date 

class PublicacionCreateDTO(BaseModel):
    Titulo: str
    Contenido: str
    Imagen: Optional[str] = None
    FechaPubl: date  
    Id_Usuario: int  

class PublicacionDTO(BaseModel):
    Id: int
    Titulo: str
    Contenido: str
    Imagen: Optional[str]
    FechaPubl: str
    usuario: User

@app.get("/publicaciones", response_model=List[PublicacionDTO])
async def get_publicaciones():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                SELECT 
                    p.Id, 
                    p.Titulo, 
                    p.Contenido, 
                    p.Imagen, 
                    DATE_FORMAT(p.FechaPubl, '%Y-%m-%d') AS FechaPubl, 
                    u.Id AS usuario_id, 
                    u.Nombre AS usuario_nombre, 
                    u.Email AS usuario_email, 
                    u.FechaNacimiento AS usuario_fechaNacimiento, 
                    u.Privilegios AS usuario_privilegios, 
                    u.Bloqueado AS usuario_bloqueado, 
                    u.Perfil AS usuario_fotoPerfil
                FROM Publicaciones p
                JOIN Usuarios u ON p.Id_Usuario = u.Id
            """
            try:
                cursor.execute(sql)
                rows = cursor.fetchall()
            except Exception as e:
                raise HTTPException(status_code=500, detail="Error interno del servidor")

            return [
                PublicacionDTO(
                    Id=row["Id"],
                    Titulo=row["Titulo"],
                    Contenido=row["Contenido"],
                    Imagen=row["Imagen"],
                    FechaPubl=row["FechaPubl"],
                    usuario=User(
                        Id=row["usuario_id"],
                        Nombre=row["usuario_nombre"],
                        Email=row["usuario_email"],
                        FechaNacimiento=row["usuario_fechaNacimiento"],
                        Privilegios=row["usuario_privilegios"],
                        Bloqueado=row["usuario_bloqueado"],
                        Perfil=row["usuario_fotoPerfil"]
                    )
                )
                for row in rows
            ]
    finally:
        conn.close()

# Modifying the function to return a DTO instead of a dictionary
@app.get("/publicaciones/{publicacion_id}", response_model=PublicacionDTO)
async def get_publicacion_id(publicacion_id: int):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                SELECT 
                    p.Id, 
                    p.Titulo, 
                    p.Contenido, 
                    p.Imagen, 
                    p.FechaPubl, 
                    u.Id AS usuario_id, 
                    u.Nombre AS usuario_nombre, 
                    u.Email AS usuario_email, 
                    u.FechaNacimiento AS usuario_fechaNacimiento, 
                    u.Privilegios AS usuario_privilegios, 
                    u.Bloqueado AS usuario_bloqueado, 
                    u.Perfil AS usuario_fotoPerfil
                FROM Publicaciones p
                INNER JOIN Usuarios u ON p.Id_Usuario = u.Id
                WHERE p.Id = %s
            """
            cursor.execute(sql, (publicacion_id,))
            row = cursor.fetchone()

            if row is None:
                raise HTTPException(status_code=404, detail="Publicación no encontrada")

            # Fetch comments for the publication
            cursor.execute("SELECT * FROM Comentarios WHERE Id_Publicacion = %s", (publicacion_id,))
            comentarios = cursor.fetchall()

            # Format the date after fetching the row
            row["FechaPubl"] = row["FechaPubl"].strftime('%Y-%m-%d')

            return {
                "Id": row["Id"],
                "Titulo": row["Titulo"],
                "Contenido": row["Contenido"],
                "Imagen": row["Imagen"],
                "FechaPubl": row["FechaPubl"],
                "usuario": {
                    "Id": row["usuario_id"],
                    "Nombre": row["usuario_nombre"],
                    "Email": row["usuario_email"],
                    "FechaNacimiento": row["usuario_fechaNacimiento"],
                    "Privilegios": row["usuario_privilegios"],
                    "Bloqueado": row["usuario_bloqueado"],
                    "Perfil": row["usuario_fotoPerfil"]
                },
                "comentarios": comentarios
            }
    finally:
        conn.close()

@app.post("/publicaciones", response_model=PublicacionCreateDTO)
async def create_publicacion(publicacion: PublicacionCreateDTO):
    conn = get_db_connection()
    print("Creating publication:", publicacion)
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO Publicaciones (Id, Titulo, Contenido, Imagen, FechaPubl, Id_Usuario)
                VALUES (Null, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
                publicacion.Titulo,
                publicacion.Contenido,
                publicacion.Imagen,
                publicacion.FechaPubl,
                publicacion.Id_Usuario
            ))

            conn.commit()
            return publicacion
    finally:
        conn.close()

@app.put("/publicaciones/{publicacion_id}", response_model=PublicacionCreateDTO)
async def update_publicacion(publicacion_id: int, publicacion: PublicacionCreateDTO):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                UPDATE Publicaciones
                SET Titulo = %s,
                    Contenido = %s,
                    Imagen = %s,
                    FechaPubl = %s
                WHERE Id = %s
            """
            cursor.execute(sql, (
                publicacion.Titulo,
                publicacion.Contenido,
                publicacion.Imagen,
                publicacion.FechaPubl,
                publicacion_id
            ))

            if cursor.rowcount == 0:
                raise HTTPException(status_code=404, detail="Publicación no encontrada")

            conn.commit()
            return publicacion
    finally:
        conn.close()

@app.delete("/publicaciones/{publicacion_id}")
async def delete_publicacion(publicacion_id: int):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "DELETE FROM Publicaciones WHERE Id = %s"
            cursor.execute(sql, (publicacion_id,))
            conn.commit()
            return {"message": "Publicación eliminada correctamente"}
    finally:
        conn.close()

# -------------------- Comentarios --------------------

class Comentario(BaseModel):
    Id: int
    Id_Usuario: int
    Id_Publicacion: int
    Contenido: str
    Fecha: date

class ComentarioCreateDTO(BaseModel):
    Id_Usuario: int
    Id_Publicacion: int
    Contenido: str
    Fecha: str

@app.get("/comentarios", response_model=List[Comentario])
async def get_comentarios():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM Comentarios")
            rows = cursor.fetchall()
            return [Comentario(**row) for row in rows]
    finally:
        conn.close()

@app.get("/comentarios/{comentario_id}", response_model=Comentario)
async def get_comentario_id(comentario_id: int):
    if not isinstance(comentario_id, int):
        raise HTTPException(status_code=422, detail="comentario_id debe ser un entero válido")

    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM Comentarios WHERE Id = %s"
            cursor.execute(sql, (comentario_id,))
            row = cursor.fetchone()

            if row is None:
                raise HTTPException(status_code=404, detail="Comentario no encontrado")

            return Comentario(**row)
    finally:
        conn.close()

@app.get("/comentarios/publicacion/{publicacion_id}", response_model=List[Comentario])
async def get_comentarios_by_publicacion(publicacion_id: int):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        sql = """
            SELECT 
                c.Id, 
                c.Id_Usuario, 
                c.Id_Publicacion, 
                c.Contenido, 
                c.Fecha,
                u.Nombre AS Usuario_Nombre,
                u.Perfil AS Usuario_Perfil,
                p.Titulo AS Publicacion_Titulo,
                p.Imagen AS Publicacion_Imagen
            FROM Comentarios c
            LEFT JOIN Usuarios u ON c.Id_Usuario = u.Id
            LEFT JOIN Publicaciones p ON c.Id_Publicacion = p.Id
            WHERE c.Id_Publicacion = %s
            ORDER BY c.Fecha DESC
        """
        cursor.execute(sql, (publicacion_id,))
        rows = cursor.fetchall()

        if not rows:
            raise HTTPException(status_code=404, detail="No se encontraron comentarios para esta publicación")

        return [
            {
                "Id": row["Id"],
                "Id_Usuario": row["Id_Usuario"],
                "Id_Publicacion": row["Id_Publicacion"],
                "Contenido": row["Contenido"],
                "Fecha": row["Fecha"],
                "Usuario": {
                    "Nombre": row["Usuario_Nombre"],
                    "Perfil": row["Usuario_Perfil"]
                }
            }
            for row in rows
        ]
    finally:
        cursor.close()
        conn.close()


@app.post("/comentarios", response_model=ComentarioCreateDTO)
async def create_comentario(comentario: ComentarioCreateDTO):
    try:
        if isinstance(comentario.Fecha, str):
            comentario.Fecha = datetime.strptime(comentario.Fecha, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=422, detail="Fecha debe ser una fecha válida en formato YYYY-MM-DD.")

    print("Creating comentario:", comentario)

    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
          
            # Verificar que la publicación y el usuario existen

            sql_check_publicacion = "SELECT Id FROM Publicaciones WHERE Id = %s"
            cursor.execute(sql_check_publicacion, (comentario.Id_Publicacion,))
            if not cursor.fetchone():
                raise HTTPException(status_code=404, detail="Publicación no encontrada")

          
            sql_check_usuario = "SELECT Id FROM Usuarios WHERE Id = %s"
            cursor.execute(sql_check_usuario, (comentario.Id_Usuario,))
            if not cursor.fetchone():
                raise HTTPException(status_code=404, detail="Usuario no encontrado")

          
            sql_insert_comentario = """
                INSERT INTO Comentarios (Id_Usuario, Id_Publicacion, Contenido, Fecha)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(sql_insert_comentario, (
                comentario.Id_Usuario,
                comentario.Id_Publicacion,
                comentario.Contenido,
                comentario.Fecha
            ))

            conn.commit()
            return comentario
    finally:
        conn.close()

@app.put("/comentarios/{comentario_id}", response_model=ComentarioCreateDTO)
async def update_comentario(comentario_id: int, comentario: ComentarioCreateDTO):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Verificar que el comentario existe
            sql_check = "SELECT Id FROM Comentarios WHERE Id = %s"
            cursor.execute(sql_check, (comentario_id,))
            if not cursor.fetchone():
                raise HTTPException(status_code=404, detail="Comentario no encontrado")

            sql = """
                UPDATE Comentarios
                SET Id_Usuario = %s,
                    Id_Publicacion = %s,
                    Contenido = %s,
                    Fecha = %s
                WHERE Id = %s
            """
            cursor.execute(sql, (
                comentario.Id_Usuario,
                comentario.Id_Publicacion,
                comentario.Contenido,
                comentario.Fecha,
                comentario_id
            ))

            conn.commit()
            return comentario
    finally:
        conn.close()

@app.delete("/comentarios/{comentario_id}")
async def delete_comentario(comentario_id: int):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Verificar si el comentario existe
            sql_check = "SELECT Id FROM Comentarios WHERE Id = %s"
            cursor.execute(sql_check, (comentario_id,))
            if not cursor.fetchone():
                raise HTTPException(status_code=404, detail="Comentario no encontrado")

            # Primero eliminar las reacciones asociadas al comentario
            sql_delete_reactions = "DELETE FROM Comentario_Reaccion WHERE Id_Comentario = %s"
            cursor.execute(sql_delete_reactions, (comentario_id,))

            # Luego eliminar el comentario
            sql_delete = "DELETE FROM Comentarios WHERE Id = %s"
            cursor.execute(sql_delete, (comentario_id,))
            
            conn.commit()
            return {"message": "Comentario eliminado correctamente"}
    finally:
        conn.close()

# -------------------- Amistades  --------------------

class AmistadDTO(BaseModel):
    usuario_id_1: int
    usuario_id_2: int
    fecha_solicitud: datetime
    estado: str

@app.get("/amistades", response_model=List[AmistadDTO])
async def get_amistades():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Amistades")
    amistades = cursor.fetchall()
    conn.close()
    return amistades

@app.post("/amistades", response_model=AmistadDTO)
async def create_amistad(amistad: AmistadDTO):

    print("Creating amistad:", amistad)

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Amistades (usuario_id_1, usuario_id_2, fecha_solicitud, estado) VALUES (%s, %s, %s, %s)",
        (amistad.usuario_id_1, amistad.usuario_id_2, amistad.fecha_solicitud, amistad.estado)
    )
    conn.commit()
    conn.close()
    return amistad

@app.get("/amistades/{user_id}", response_model=List[AmistadDTO])
async def get_user_amistades(user_id: int):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                SELECT * FROM Amistades
                WHERE usuario_id_1 = %s OR usuario_id_2 = %s
            """
            cursor.execute(sql, (user_id, user_id))
            rows = cursor.fetchall()
            return [AmistadDTO(**row) for row in rows]
    finally:
        conn.close()