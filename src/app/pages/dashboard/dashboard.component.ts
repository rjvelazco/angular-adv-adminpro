import { Component, OnInit } from '@angular/core';

// Services
import { BusquedasService } from '../../services/busquedas.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public label: string[] = ['Usuarios', 'Medicos', 'Hospitales'];
  public data : number[] = [];

  public tareas: string[] = [];

  constructor(
    private busquedasService: BusquedasService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.busquedasService.cantidadRegistros()
      .subscribe((totales: any) => { 
        this.data.push(totales.totalUsuarios);
        this.data.push(totales.totalMedicos);
        this.data.push(totales.totalHospitales);
        this.tareas = this.usuarioService.usuario.tareas;
      });
  }

  eliminarTarea(index: number) {
    this.usuarioService.eliminarTarea(index)
      .subscribe(resp => this.obtenerTareas());
  }

  obtenerTareas() {
    this.usuarioService.obtenerTareas()
      .subscribe((tareas: string[]) => {
        this.tareas = tareas;
      })
  }

  agregarTarea(tarea: string) {
    if(tarea.trim().length === 0){
      return;
    }
    this.usuarioService.agregarTarae(tarea)
      .subscribe(resp => this.tareas.push(tarea));
  }

}
