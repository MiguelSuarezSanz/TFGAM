from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from enum import Enum
from datetime import date

app = FastAPI()

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

# Pydantic model for User
class User(BaseModel):
    Id: int
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

# POST: crear un nuevo usuario



# PUT: actualizar un usuario existente
@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, updated_user: User):
    for index, user in enumerate(fake_db):
        if user.id == user_id:
            fake_db[index] = updated_user
            return updated_user
    raise HTTPException(status_code=404, detail="User not found")

# DELETE: eliminar un usuario
@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    for index, user in enumerate(fake_db):
        if user.id == user_id:
            del fake_db[index]
            return {"message": "User deleted successfully"}
    raise HTTPException(status_code=404, detail="User not found")