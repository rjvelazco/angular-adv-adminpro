import { Component, OnInit } from '@angular/core';

// Services
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

declare function customInitFunctions();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  public imgUrl: string;

  constructor(
    private usuarioService: UsuarioService
  ) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    // customInitFunctions();
  }

  logout() {
    this.usuarioService.logout();
  }

  get userImage() {
    return this.usuario.imagenUrl;
  }

}
