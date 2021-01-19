import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { BusquedasService } from '../../services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

// Models
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios   : Usuario[]   = [];
  public medicos    : Medico[]    = [];
  public hospitales : Hospital[]  = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
    private hospitalService: HospitalService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ termino }) => this.busquedaGlobal(termino));
  }

  busquedaGlobal(termino: string) {
    this.busquedasService.busquedaGlobal(termino)
      .subscribe((resp: any) => {
        console.log(resp);
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      });
  }

  irUsuario(termino: string) {
    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      this.usuarioService.busqueda = termino;
      this.router.navigateByUrl('/dashboard/usuarios');      
    } else {
      Swal.fire({
        title: 'No autorizado',
        text: 'Solo los administradores pueden ver la informacion sensible de los usuarios.',
        icon: 'error',
      })
    }
  }

  irHospital(termino: string) {
    this.hospitalService.busqueda = termino;
    this.router.navigateByUrl('/dashboard/hospitales');
  }

}
