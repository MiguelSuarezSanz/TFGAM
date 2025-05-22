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
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
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
    user = "User"


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
    Email: EmailStr
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
    Perfil: str
    Privilegios: str 
    Bloqueado: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class LoginDTO(BaseModel):
    Email: EmailStr
    Password: str

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
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:

            check_sql = "SELECT Id FROM Usuarios WHERE Email = %s"
            cursor.execute(check_sql, (user.Email,))
            existing_user = cursor.fetchone()
            if existing_user:
                raise HTTPException(status_code=400, detail="El usuario ya existe")

            # Insertar usuario
            hashed_password = get_password_hash(user.Password)
            sql = """
                INSERT INTO Usuarios (Nombre, Email, FechaNacimiento, Perfil, Privilegios, Bloqueado, Password)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
                user.Nombre,
                user.Email,
                user.FechaNacimiento,
                user.Perfil if user.Perfil else None,  # Campo opcional
                user.Privilegios,
                user.Bloqueado if user.Bloqueado is not None else False,  # Campo opcional
                hashed_password
            ))
            conn.commit()
            return {"message": "Usuario creado correctamente", "id": cursor.lastrowid}
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Error al crear el usuario")
    finally:
        conn.close()

# Login
@app.post("/login", response_model=Token)
async def login(user: LoginDTO):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM Usuarios WHERE Email = %s"  # <-- Cambiado a Email para login
            cursor.execute(sql, (user.Email))  # <-- Cambiar Nombre por Email
            db_user = cursor.fetchone()

            if not db_user or not verify_password(user.Password, db_user["Password"]):
                raise HTTPException(status_code=401, detail="Credenciales inválidas")

            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(
                data={"sub": db_user["Email"]}, expires_delta=access_token_expires  # <-- Cambiado a Email
            )
            return {"access_token": access_token, "token_type": "bearer"}
    finally:
        conn.close()


# PUT: actualizar un usuario existente
@app.put("/users/{user_id}", response_model=UserUpdateDTO)
async def update_user(user_id: int, user: UserUpdateDTO):
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