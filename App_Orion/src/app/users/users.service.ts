import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserCreateDTO, UserDTO, UserLoginDTO } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  

  constructor(private http: HttpClient) {


   }

   private apiURL = environment.apiURL + "users";

   public crear(user: UserCreateDTO): Observable<number> {
    // Simplified error handling and removed advanced formatting
    return this.http.post<number>(this.apiURL, user).pipe(
      catchError((error) => {
        console.log('Error al crear usuario:', error);
        alert('Error al crear usuario');
        return throwError(() => new Error('Error al crear usuario'));
      })
    );
  }

  public getAll(): Observable<HttpResponse<UserDTO[]>> {
    return this.http.get<UserDTO[]>(this.apiURL, { observe: 'response' });
  }

  public getUser(id: number): Observable<HttpResponse<UserDTO>> {
    return this.http.get<UserDTO>(`${this.apiURL}/${id}`, { observe: 'response' });
  }

  public edit(userId: number, user: UserCreateDTO): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(`${this.apiURL}/${userId}`, user, { observe: 'response' });
  }

  public borrar(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  // Simplified login logic
  public logIn(user: UserLoginDTO): Observable<{ token: string; user: UserDTO }> {
    return this.http.post<{ token: string; user: UserDTO }>(`${this.apiURL}/login`, user).pipe(
      catchError((error) => {
        console.log('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión');
        return throwError(() => new Error('Error al iniciar sesión'));
      })
    );
  }

  public registrar(user: UserCreateDTO): Observable<number> {

    // Formatear la fecha para enviar solo día, mes y año
    const fecha = new Date(user.FechaNacimiento);
    user.FechaNacimiento = new Date(`${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`);

    user.Bloqueado = 'false'; // Bloqueado por defecto
    user.Privilegios = 'Usuario'; // Privilegios por defecto

    return this.http.post<number>(this.apiURL, user);
  }

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


