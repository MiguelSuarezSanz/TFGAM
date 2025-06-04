import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "../../users/login/login.component";
import { RegisterComponent } from "../../users/register/register.component";
import { UserDTO } from '../../users/user';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, LoginComponent, RegisterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  logo_orion = 'assets/images/logoOrion.png';
  showModal: boolean = false;
  modalType: 'login' | 'register' = 'login';
  isLoggedIn: boolean = false; // Simula el estado de autenticación
  userModal: UserDTO | null = null; // Modal para almacenar la información del usuario
  userName: string | undefined;
  userProfilePicture: string | undefined;

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user: UserDTO = JSON.parse(storedUser);
        this.isLoggedIn = true;
        this.userName = user.Nombre;
        this.userProfilePicture = user.Perfil;
        this.userModal = user;
      }
    }
  }

  openModal(type: 'login' | 'register') {
    this.modalType = type;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  logout() {
    this.isLoggedIn = false;
    this.userModal = null;
    localStorage.removeItem('user'); // Eliminar el usuario de localStorage
    location.reload();
  }

  onLoginSuccess(user: UserDTO) {
    this.isLoggedIn = true;
    this.userName = user.Nombre;
    this.userProfilePicture = user.Perfil;
    this.userModal = user;
    localStorage.setItem('user', JSON.stringify(user)); // Guardar el usuario en localStorage
    this.showModal = false;
    location.reload();
  }
}
