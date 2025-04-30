import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserDTO } from '../user';
import { HttpResponse } from '@angular/common/http';
import { MatTableModule} from "@angular/material/table";
import { CommonModule} from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterLink } from '@angular/router';

import { ListadoGenericoComponent } from '../../utilidades/listado-generico/listado-generico.component';

@Component({
  selector: 'app-index-users',
  standalone: true,
  imports: [CommonModule, ListadoGenericoComponent,MatTableModule, SweetAlert2Module, RouterLink],
  templateUrl: './index-users.component.html',
  styleUrl: './index-users.component.css'
})
export class IndexUsersComponent implements OnInit{

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  users: UserDTO[] = []
  columnasAMostrar: string[] = ['id', 'nombre','email', 'acciones'];

  cargarRegistros(){
    this.usersService.getAll()
      .subscribe((res: HttpResponse<UserDTO[]>) => {
        this.users = res.body || []; 
      }, error => {
        console.error('Error loading users:', error);
      });
  }
  borrar(id: number){
    this.usersService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros();
    }, error => console.error(error))
  }
  
}
