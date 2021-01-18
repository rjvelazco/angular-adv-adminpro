import { Component, OnInit } from '@angular/core';

// Services
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

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
    private usuarioService: UsuarioService,
    private router: Router
  ) { 
    this.usuario = usuarioService.usuario;
  }
  
  ngOnInit(): void {
    // customInitFunctions();
  }
  
  get userImage() {
    return this.usuario.imagenUrl;
  }
  
  logout() {
    this.usuarioService.logout();
  }


  buscar(termino: string) {
    if (termino.length === 0) {
      return;      
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
