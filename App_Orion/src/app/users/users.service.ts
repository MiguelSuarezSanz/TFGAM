import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserCreateDTO } from './user';
import { Observable } from 'rxjs';
import { formatDate } from '../../utilidades/utilidades';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {


   }

   private apiURL = environment.apiUrl + "users";

   public crear(user: UserCreateDTO): Observable<number> {
    const formData = this.BuildFormData(user);

    return this.http.post<number>(this.apiURL, formData);
   }

   private BuildFormData(user: UserCreateDTO): FormData{
    const formData = new FormData();

    formData.append('nombre', user.nombre)
  
    formData.append('email', user.email)
    formData.append('fechaNacimiento', formatDate(user.fechaNacimiento))
    formData.append('password', user.password)
    if(user.perfil){
      formData.append('perfil', user.perfil)
    }
    formData.append('privilegios', user.privilegios)
    formData.append('bloqueado', user.bloqueado)

    return formData;
   }

 
}


