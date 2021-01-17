import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// Services
import { BusquedasService } from '../../../services/busquedas.service';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

// Models
import { Medico } from '../../../models/medico.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[];
  public medicosTemp: Medico[];

  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.obtenerMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      ).subscribe(img => this.obtenerMedicos());
  }

  ngOnDestroy(): void{
    this.imgSubs.unsubscribe();
  }

  obtenerMedicos() {
    this.cargando = true;
    this.medicoService.obtenerMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
      });
  }

  buscarMedico(termino: string) {
    if (termino.length === 0) {
      return this.medicos = this.medicosTemp;
    }
    this.busquedasService.buscar('medicos', termino)
      .subscribe((resultados:Medico[]) => {
        this.medicos = resultados;
      });
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Desea borrarlo?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(medico);
        this.medicoService.eliminarMedico(medico._id)
          .subscribe(resp => {
            Swal.fire('Eliminado', `El medico ${medico.nombre} ha sido eliminado`, 'success');
            this.obtenerMedicos();
          });
      }
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

}
