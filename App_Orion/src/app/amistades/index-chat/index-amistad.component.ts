import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmistadesService, Amistad } from '../amistades.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../users/users.service';
import { UserDTO } from '../../users/user';
import { AuthUtilsService } from '../../utilidades/auth-utils.service';

@Component({
  selector: 'app-index-amistad',
  imports: [CommonModule, FormsModule],
  templateUrl: './index-amistad.component.html',
  styleUrl: './index-amistad.component.css'
})
export class IndexAsmistadComponent implements OnInit {
  amistades: Amistad[] = [];
  nuevaAmistad: Amistad = { id: 0, usuario_id_1: 0, usuario_id_2: 0, fecha_solicitud: '', estado: 'pendiente' };
  usuarios: UserDTO[] = [];
  searchTerm: string = '';
  searchTermMisAmistades: string = '';
  misAmistades: Amistad[] = [];
  currentPageAmistades: number = 1;
  currentPageUsuarios: number = 1;
  currentPageMisAmistades: number = 1;
  itemsPerPage: number = 10;
  public currentUserId: number;

  constructor(
    private amistadesService: AmistadesService,
    private usersService: UsersService,
    private authUtils: AuthUtilsService
  ) {
    this.currentUserId = this.authUtils.getCurrentUserId();
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.Id;
    if (!userId) {
      console.error('No se encontró el ID del usuario en el localStorage');
      return;
    }
    this.cargarAmistades();
    this.cargarUsuarios();
    this.cargarMisAmistades(userId);
  }

  cargarAmistades(): void {
    this.amistadesService.obtenerAmistades().subscribe({
      next: (data: Amistad[]) => {
        this.amistades = data;
      },
      error: (err: any) => {
        console.error('Error al cargar amistades:', err);
      }
    });
  }

  cargarUsuarios(): void {
    this.usersService.getAll().subscribe({
      next: (data: UserDTO[]) => {
        this.usuarios = data;
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  cargarMisAmistades(userId: number): void {
    this.amistadesService.obtenerAmistadesPorUsuario(userId).subscribe({
      next: (amistades: Amistad[]) => {
        this.misAmistades = amistades.map(amistad => {
          const amigoId = amistad.usuario_id_1 === userId ? amistad.usuario_id_2 : amistad.usuario_id_1;
          const amigo = this.usuarios.find(usuario => usuario.Id === amigoId);
          return {
            ...amistad,
            amigoNombre: amigo ? amigo.Nombre : 'Desconocido'
          };
        });
      },
      error: (err: any) => {
        console.error('Error al cargar mis amistades:', err);
      }
    });
  }

  crearAmistad(): void {
    this.amistadesService.crearAmistad(this.nuevaAmistad).subscribe({
      next: (data: Amistad) => {
        this.amistades.push(data);
        this.nuevaAmistad = { id: 0, usuario_id_1: 0, usuario_id_2: 0, fecha_solicitud: '', estado: 'pendiente' };
      },
      error: (err: any) => {
        console.error('Error al crear amistad:', err);
      }
    });
  }

  aceptarAmistad(id: number): void {
    this.amistadesService.actualizarEstado(id, 'aceptada').subscribe({
      next: () => {
        const amistad = this.amistades.find(a => a.id === id);
        if (amistad) {
          amistad.estado = 'aceptada';
        }
      },
      error: (err: any) => {
        console.error('Error al aceptar amistad:', err);
      }
    });
  }

  rechazarAmistad(id: number): void {
    this.amistadesService.actualizarEstado(id, 'rechazada').subscribe({
      next: () => {
        this.amistades = this.amistades.filter(a => a.id !== id);
      },
      error: (err: any) => {
        console.error('Error al rechazar amistad:', err);
      }
    });
  }

  enviarSolicitudAmistad(usuarioId: number): void {
    const userId = this.authUtils.getCurrentUserId();
    const now = new Date();
    const fechaSolicitud = now.toISOString().split('T')[0]; // Formato ISO YYYY-MM-DD

    const nuevaAmistad: Amistad = {
      id: 0,
      usuario_id_1: userId,
      usuario_id_2: usuarioId,
      fecha_solicitud: fechaSolicitud,
      estado: 'pendiente'
    };

    this.amistadesService.crearAmistad(nuevaAmistad).subscribe({
      next: (data: Amistad) => {
        console.log('Solicitud de amistad enviada:', data);
      },
      error: (err: any) => {
        console.error('Error al enviar solicitud de amistad:', err);
      }
    });
  }

  obtenerNombreAmigo(amistad: any): string {
    const amigoId = amistad.usuario_id_1 === 1 ? amistad.usuario_id_2 : amistad.usuario_id_1;
    const amigo = this.usuarios.find((usuario: any) => usuario.Id === amigoId);
    return amigo ? amigo.Nombre : 'Desconocido';
  }
  buscarUsuarios(): UserDTO[] {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.Id;

    if (!this.searchTerm.trim()) {
      return this.usuarios.filter(usuario =>
        !this.misAmistades.some(amistad =>
          amistad.usuario_id_1 === usuario.Id || amistad.usuario_id_2 === usuario.Id
        )
      );
    }

    return this.usuarios.filter(usuario =>
      (!this.misAmistades.some(amistad =>
        amistad.usuario_id_1 === usuario.Id || amistad.usuario_id_2 === usuario.Id
      )) &&
      (usuario.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       usuario.Id.toString().includes(this.searchTerm))
    ).filter(usuario =>
      !this.misAmistades.some(amistad =>
        (amistad.usuario_id_1 === usuario.Id || amistad.usuario_id_2 === usuario.Id) && amistad.estado === 'aceptada'
      )
    );
  }

  get paginatedAmistades(): Amistad[] {
    const start = (this.currentPageAmistades - 1) * this.itemsPerPage;
    return this.amistades.slice(start, start + this.itemsPerPage);
  }

  get paginatedUsuarios(): UserDTO[] {
    const start = (this.currentPageUsuarios - 1) * this.itemsPerPage;
    return this.buscarUsuarios().slice(start, start + this.itemsPerPage);
  }

  get paginatedMisAmistades(): Amistad[] {
    const start = (this.currentPageMisAmistades - 1) * this.itemsPerPage;
    return this.misAmistades.slice(start, start + this.itemsPerPage);
  }

  get paginatedMisAmistadesFiltered(): Amistad[] {
    let filtradas = this.misAmistades;
    if (this.searchTermMisAmistades && this.searchTermMisAmistades.trim() !== '') {
      filtradas = this.misAmistades.filter(amistad => {
        const amigoId = amistad.usuario_id_1 === this.currentUserId ? amistad.usuario_id_2 : amistad.usuario_id_1;
        const amigo = this.usuarios.find(usuario => usuario.Id === amigoId);
        const nombre = amigo ? amigo.Nombre.toLowerCase() : '';
        return (
          nombre.includes(this.searchTermMisAmistades.toLowerCase()) ||
          amigoId.toString().includes(this.searchTermMisAmistades)
        );
      });
    }
    const start = (this.currentPageMisAmistades - 1) * this.itemsPerPage;
    return filtradas.slice(start, start + this.itemsPerPage);
  }

  get solicitudesPendientes(): Amistad[] {
    return this.amistades.filter(
      a => a.usuario_id_2 === this.currentUserId && a.estado === 'pendiente'
    );
  }

  changePageAmistades(page: number): void {
    this.currentPageAmistades = page;
  }

  changePageUsuarios(page: number): void {
    this.currentPageUsuarios = page;
  }

  changePageMisAmistades(page: number): void {
    this.currentPageMisAmistades = page;
  }
}