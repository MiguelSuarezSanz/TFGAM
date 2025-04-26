from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Modelo de datos
class User(BaseModel):
    id: int
    name: str
    email: str

# Base de datos simulada
fake_db: List[User] = []

# GET: obtener todos los usuarios
@app.get("/users", response_model=List[User])
def get_users():
    return fake_db

# POST: crear un nuevo usuario
@app.post("/users", response_model=User)
def create_user(user: User):
    # Verificar si ya existe el id
    if any(u.id == user.id for u in fake_db):
        raise HTTPException(status_code=400, detail="User ID already exists")
    fake_db.append(user)
    return user

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
