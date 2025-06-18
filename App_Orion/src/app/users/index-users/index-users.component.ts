import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserDTO } from '../user';
import { HttpResponse } from '@angular/common/http';
import { MatTableModule} from "@angular/material/table";
import { CommonModule} from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../utilidades/dialogo-confirmacion/dialogo-confirmacion.component';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ListadoGenericoComponent } from '../../utilidades/listado-generico/listado-generico.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-index-users',
  standalone: true,
  imports: [CommonModule, ListadoGenericoComponent, MatTableModule, RouterLink, MatDialogModule, MatPaginatorModule],
  templateUrl: './index-users.component.html',
  styleUrls: ['./index-users.component.css']
})
export class IndexUsersComponent implements OnInit{

  constructor(private usersService: UsersService, private dialog: MatDialog, private authService: AuthService){}

  isAdmin: boolean = false;

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.cargarRegistros();
  }

  users: UserDTO[] = [];
  paginatedUsers: UserDTO[] = [];
  pageSize: number = 10;
  currentPage: number = 0;
  columnasAMostrar: string[] = ['id', 'nombre','email', 'acciones'];

  cargarRegistros(){
    this.usersService.getAll()
      .subscribe((users: UserDTO[]) => {
      this.users = users || [];
      this.updatePaginatedUsers();
      }, error => {
      console.error('Error loading users:', error);
      });
  }

  updatePaginatedUsers(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers();
  }

  borrar(id: number){
    this.usersService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros();
    }, error => console.error(error))
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Estás seguro de que deseas borrar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.borrar(id);
      }
    });
  }
  
}
