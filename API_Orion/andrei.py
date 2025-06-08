from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from enum import Enum
from datetime import date,datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from jose import JWTError, jwt

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
    allow_origins=["*"],  # Permitir todos los orígenes temporalmente
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los encabezados
)

import pymysql

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
        print("Conexión exitosa")
        return conn
    except pymysql.MySQLError as e:
        print(f"Error conectando a la base de datos: {e}")
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
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    finally:
        conn.close()

# POST: crear un nuevo usuario
@app.post("/users", response_model=UserCreateDTO)
async def create_user(user: UserCreateDTO):
    if not user.Perfil:
        user.Perfil = "Assets/FotoPreterminada.png"

    print(user.dict())
    

    print(user)
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
                user.Perfil,  # Can be None
                user.Privilegios,
                user.Bloqueado if user.Bloqueado is not None else False,  # Default False
                hashed_password,
            ))

            conn.commit()
            return user  # Return the created user object
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    finally:
        conn.close()

# PUT: actualizar un usuario existente
@app.put("/users/{user_id}", response_model=UserUpdateDTO)
async def update_user(user_id: int, user: UserUpdateDTO):
    if not user.Perfil:
        user.Perfil = "Assets/FotoPreterminada.png"

    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            hashed_password = get_password_hash(user.Password)  # <-- Hashear la nueva contraseña
            sql = """
                UPDATE Usuarios
                SET Nombre = %s,
                    Email = %s,
                    FechaNacimiento = %s,
                    Perfil = %s,
                    Privilegios = %s,
                    Bloqueado = %s,
                    Password = %s  # <-- Agregado para actualizar la contraseña
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
            return {"mensaje": "Usuario actualizado correctamente"}
    except Exception as e:
        print("Error:", e)
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
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    finally:
        conn.close()

# POST: iniciar sesión
@app.post("/users/login")
async def login(user: LoginDTO):
    try:
        print("Estableciendo conexión con la base de datos...")
        conn = get_db_connection()
        print("Conexión establecida correctamente.")
        with conn.cursor() as cursor:
            print("Ejecutando consulta SQL para el email:", user.Email)
            sql = "SELECT * FROM Usuarios WHERE Email = %s"
            cursor.execute(sql, (user.Email,))
            row = cursor.fetchone()

            if row is None:
                print("Usuario no encontrado en la base de datos.")
                raise HTTPException(status_code=401, detail="Credenciales inválidas")

            print("Usuario encontrado en la base de datos:", row)

            if not verify_password(user.Password, row['Password']):
                print("La contraseña proporcionada no coincide.")
                raise HTTPException(status_code=401, detail="Credenciales inválidas")

            access_token = create_access_token(data={"sub": row['Email']})
            print("Token de acceso generado correctamente.")
            return {"access_token": access_token, "token_type": "bearer", "user": row}
    except pymysql.MySQLError as db_error:
        print("Error de base de datos:", db_error)
        raise HTTPException(status_code=500, detail="Error conectando a la base de datos")
    except Exception as e:
        print("Error interno del servidor:", e)
        raise HTTPException(status_code=500, detail="Error interno del servidor")
    finally:
        if 'conn' in locals() and conn.open:
            conn.close()
            print("Conexión a la base de datos cerrada.")

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

@app.get("/publicaciones", response_model=List[Publicacion])
async def get_publicaciones():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM Publicaciones")
            rows = cursor.fetchall()
            return [Publicacion(**row) for row in rows]
    finally:
        conn.close()

# Adjusted query to include the user's name in the publication details
@app.get("/publicaciones/{publicacion_id}", response_model=Publicacion)
async def get_publicacion_id(publicacion_id: int):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                SELECT p.Id, p.Titulo, p.Contenido, p.Imagen, p.FechaPubl, u.Nombre AS Usuario_Nombre
                FROM Publicaciones p
                INNER JOIN Usuarios u ON p.Id_Usuario = u.Id
                WHERE p.Id = %s
            """
            cursor.execute(sql, (publicacion_id,))
            row = cursor.fetchone()

            if row is None:
                raise HTTPException(status_code=404, detail="Publicación no encontrada")

            return Publicacion(**row)
    finally:
        conn.close()

@app.post("/publicaciones", response_model=PublicacionCreateDTO)
async def create_publicacion(publicacion: PublicacionCreateDTO):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO Publicaciones (Id, Titulo, Contenido, Imagen, FechaPubl)
                VALUES (Null, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
                publicacion.Titulo,
                publicacion.Contenido,
                publicacion.Imagen,
                publicacion.FechaPubl
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
            sql_check = "SELECT Id FROM Publicaciones WHERE Id = %s"
            cursor.execute(sql_check, (publicacion_id,))
            publicacion = cursor.fetchone()

            if not publicacion:
                raise HTTPException(status_code=404, detail="Publicación no encontrada")

            sql_delete = "DELETE FROM Publicaciones WHERE Id = %s"
            cursor.execute(sql_delete, (publicacion_id,))
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
    Fecha: date

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
        with conn.cursor() as cursor:
            sql = """
                SELECT c.Id, c.Id_Usuario, c.Id_Publicacion, c.Contenido, c.Fecha, u.Nombre AS Usuario_Nombre
                FROM Comentarios c
                INNER JOIN Usuarios u ON c.Id_Usuario = u.Id
                WHERE c.Id_Publicacion = %s
                ORDER BY c.Fecha DESC
            """
            cursor.execute(sql, (publicacion_id,))
            rows = cursor.fetchall()

            if not rows:
                raise HTTPException(status_code=404, detail="No se encontraron comentarios para esta publicación")

            return [Comentario(**row) for row in rows]
    finally:
        conn.close()

@app.post("/comentarios", response_model=ComentarioCreateDTO)
async def create_comentario(comentario: ComentarioCreateDTO):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Verificar que la publicación existe
            sql_check = "SELECT Id FROM Publicaciones WHERE Id = %s"
            cursor.execute(sql_check, (comentario.Id_Publicacion,))
            if not cursor.fetchone():
                raise HTTPException(status_code=404, detail="Publicación no encontrada")

            # Verificar que el usuario existe
            sql_check = "SELECT Id FROM Usuarios WHERE Id = %s"
            cursor.execute(sql_check, (comentario.Id_Usuario,))
            if not cursor.fetchone():
                raise HTTPException(status_code=404, detail="Usuario no encontrado")

            sql = """
                INSERT INTO Comentarios (Id, Id_Usuario, Id_Publicacion, Contenido, Fecha)
                VALUES (NULL, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
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