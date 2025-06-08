import pymysql
from datetime import date

def get_db_connection():
    return pymysql.connect(
        host="localhost",
        user="admin",
        password="admin",
        database="OrionDB",
        port=3306,
        cursorclass=pymysql.cursors.DictCursor
    )

def insertar_usuarios_y_publicaciones():
    usuarios = [
        ("Alicia", "alicia@ejemplo.com", date(1990, 5, 15), "Admin", False, "contrasena1"),
        ("Roberto", "roberto@ejemplo.com", date(1985, 8, 20), "Usuario", False, "contrasena2"),
        ("Carlos", "carlos@ejemplo.com", date(1992, 3, 10), "Usuario", False, "contrasena3"),
        ("Diana", "diana@ejemplo.com", date(1995, 7, 25), "Usuario", False, "contrasena4"),
        ("Eva", "eva@ejemplo.com", date(1988, 12, 5), "Usuario", False, "contrasena5"),
        ("Francisco", "francisco@ejemplo.com", date(1993, 11, 30), "Usuario", False, "contrasena6"),
        ("Graciela", "graciela@ejemplo.com", date(1991, 4, 18), "Usuario", False, "contrasena7"),
        ("Héctor", "hector@ejemplo.com", date(1987, 9, 12), "Usuario", False, "contrasena8"),
        ("Irene", "irene@ejemplo.com", date(1994, 6, 22), "Usuario", False, "contrasena9"),
        ("Javier", "javier@ejemplo.com", date(1989, 1, 8), "Usuario", False, "contrasena10"),
    ]

    publicaciones = [
        ("Mi primera campaña de DnD", "Disfruté mucho jugando mi primera campaña de DnD. ¡La historia fue inmersiva!", "", date(2025, 6, 1), 1),
        ("Batalla épica", "Nuestro grupo enfrentó a un dragón, ¡fue la experiencia más emocionante!", "", date(2025, 6, 2), 2),
        ("Diversión en el rol", "Me encantó interpretar a un bardo y componer canciones para el grupo.", "", date(2025, 6, 3), 3),
        ("Exploración de mazmorras", "Explorar la mazmorra fue intenso, ¡especialmente con todas las trampas!", "", date(2025, 6, 4), 4),
        ("Golpe crítico", "Saqué un 20 natural en el momento perfecto, ¡salvando al grupo!", "", date(2025, 6, 5), 5),
        ("Desarrollo de personaje", "Mi pícaro tuvo una historia conmovedora revelada durante la sesión.", "", date(2025, 6, 6), 6),
        ("Accidente mágico", "Nuestro mago lanzó accidentalmente una bola de fuego al grupo. ¡Fue caótico pero divertido!", "", date(2025, 6, 7), 7),
        ("Búsqueda del tesoro", "Encontramos un cofre del tesoro oculto con objetos raros.", "", date(2025, 6, 8), 8),
        ("Traición inesperada", "Uno de los NPCs en los que confiábamos resultó ser un villano.", "", date(2025, 6, 9), 9),
        ("Jefe final", "La pelea contra el jefe final fue épica y desafiante. ¡Apenas lo logramos!", "", date(2025, 6, 10), 10),
    ]

    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Insertar usuarios
            for usuario in usuarios:
                sql_usuario = """
                    INSERT INTO Usuarios (Nombre, Email, FechaNacimiento, Privilegios, Bloqueado, Password)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql_usuario, usuario)

            # Insertar publicaciones
            for publicacion in publicaciones:
                sql_publicacion = """
                    INSERT INTO Publicaciones (Titulo, Contenido, Imagen, FechaPubl, IdUsuario)
                    VALUES (%s, %s, %s, %s, %s)
                """
                cursor.execute(sql_publicacion, publicacion)

            conn.commit()
            print("Datos insertados correctamente.")
    except Exception as e:
        print(f"Error al insertar datos: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    insertar_usuarios_y_publicaciones()