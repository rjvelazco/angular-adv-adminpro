import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Services
import { UsuarioService } from '../../../services/usuario.service';

// Models
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [ 
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;

  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({usuarios,total}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  cambiarPagina(valor:number) {
    
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino)
      .subscribe(resultados => {
        this.usuarios = resultados;
      });
  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire({
        title: 'Recuerda',
        text: 'No puede borrarte a ti mismo.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    };

    Swal.fire({
      title: '¿Desea borrarlo?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.uid)
          .subscribe((resp:any) => {
            if (resp.ok) {
              // this.usuarios = this.usuarios.filter(usuarioArr => usuarioArr.uid != usuario.uid);
              this.cargarUsuarios();

              Swal.fire(
                'Usuario Borrado!',
                `El usuario ${usuario.nombre} ha sido borrado con exito.`,
                'success'
              );

            }
          });
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => console.log(resp));
  }


  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
  }

}
