import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // Informacion del usuario
  public usuario: Usuario;
  
  // Menu
  // public menuItems: any[];

  constructor(
    public sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  get userImage() {
    return this.usuario.imagenUrl;
  }

  logout() {
    this.usuarioService.logout();
  }

}
