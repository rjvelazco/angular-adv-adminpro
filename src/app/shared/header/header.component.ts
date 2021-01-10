import { Component, OnInit } from '@angular/core';

// Services
import { UsuarioService } from '../../services/usuario.service';

declare function customInitFunctions();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    customInitFunctions();
  }

  logout() {
    this.usuarioService.logout();
    
  }

}
