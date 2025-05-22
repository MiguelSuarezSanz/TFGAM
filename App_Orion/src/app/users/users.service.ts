import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserCreateDTO, UserDTO, UserLoginDTO } from './user';
import { Observable } from 'rxjs';
import { formatDate } from '../utilidades/utilidades';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  

  constructor(private http: HttpClient) {


   }

   private apiURL = environment.apiURL + "users";

   public crear(user: UserCreateDTO): Observable<number> {
    let formData = this.BuildFormData(user);

      return this.http.post<number>(this.apiURL, formData);
      
      
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

  public logIn(user: UserLoginDTO): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiURL}/login`, user);
  }

   private BuildFormData(user: UserCreateDTO): FormData{
    const formData = new FormData();

    formData.append('nombre', user.Nombre);
    formData.append('email', user.Email);
    formData.append('fechaNacimiento', formatDate(user.FechaNacimiento));
    formData.append('password', user.Password);
    if (user.Perfil) {
      formData.append('perfil', user.Perfil ? user.Perfil : '');
    }
    formData.append('privilegios', user.Privilegios);
    formData.append('bloqueado', user.Bloqueado ? 'true' : 'false'); 

    return formData;
   }

 
}


