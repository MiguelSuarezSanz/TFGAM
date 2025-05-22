from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from enum import Enum
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
        exit(1)


class PrivilegiosEnum(str, Enum):
    admin = "Admin"
    user = "User"


class User(BaseModel):
    Id: int
    Nombre: str
    Email: EmailStr
    FechaNacimiento: date
    Password: str
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

# PUT: actualizar un usuario existente
@app.put("/users/{user_id}", response_model=UserUpdateDTO)
async def update_user(user_id: int, user: UserUpdateDTO):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                UPDATE Usuarios
                SET Nombre = %s,
                    Email = %s,
                    FechaNacimiento = %s,
                    Perfil = %s,
                    Privilegios = %s,
                    Bloqueado = %s
                WHERE Id = %s
            """
            cursor.execute(sql, (
                user.Nombre,
                user.Email,
                user.FechaNacimiento,
                user.Perfil,
                user.Privilegios,
                user.Bloqueado,
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
def delete_user(user_id: int):
    for index, user in enumerate(fake_db):
        if user.id == user_id:
            del fake_db[index]
            return {"message": "User deleted successfully"}
    raise HTTPException(status_code=404, detail="User not found")