import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserCreateDTO, UserDTO, UserLoginDTO } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // API URL for user-related operations
  private apiURL = environment.apiURL + "users";

  // Create a new user
  public crear(user: UserCreateDTO): Observable<number> {
    return this.http.post<number>(this.apiURL, user).pipe(
      catchError((error) => {
        alert('Error al crear usuario');
        return throwError(() => new Error('Error al crear usuario'));
      })
    );
  }

  // Fetch all users
  public getAll(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.apiURL);
  }

  // Fetch a single user by ID
  public getUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiURL}/${id}`);
  }

  // Update an existing user
  public edit(userId: number, user: UserCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiURL}/${userId}`, user);
  }

  // Delete a user by ID
  public borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  // Log in a user
  public logIn(user: UserLoginDTO): Observable<{ token: string; user: UserDTO }> {
    return this.http.post<{ token: string; user: UserDTO }>(`${this.apiURL}/login`, user).pipe(
      catchError((error) => {
        alert('Error al iniciar sesión');
        return throwError(() => new Error('Error al iniciar sesión'));
      })
    );
  }

   // Build form data for user creation
   private BuildFormData(user: UserCreateDTO): FormData{
    const formData = new FormData();

    formData.append('nombre', user.Nombre);
    formData.append('email', user.Email);
    formData.append('fechaNacimiento', user.FechaNacimiento.toISOString().split('T')[0]);
    formData.append('password', user.Password);
    if (user.Perfil) {
      formData.append('perfil', user.Perfil ? user.Perfil : '');
    }
    formData.append('privilegios', user.Privilegios);
    formData.append('bloqueado', user.Bloqueado ? 'true' : 'false'); 

    return formData;
   }

 
}


