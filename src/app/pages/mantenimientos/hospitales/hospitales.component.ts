import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Services
import { HospitalService } from '../../../services/hospital.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

// Models
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[];
  public hospitalesTemp: Hospital[];

  private imgSubs: Subscription;
  
  public cargando: boolean  = true;
  public busqueda: string   = '';
  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.obtenerHospitales();

    if (this.hospitalService.busqueda.length>0) {
      this.busqueda = this.hospitalService.busqueda;
      this.buscarHospital(this.busqueda);
      this.hospitalService.busqueda = '';
    }

    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe(img => this.obtenerHospitales())
  }

  ngOnDestroy(): void{
    this.imgSubs.unsubscribe();
  }

  obtenerHospitales() {
    this.cargando = true;
    this.hospitalService.obtenerHospitales()
      .subscribe((hospitales) => {
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
        this.cargando = false;
      });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    
    Swal.fire({
      title: '¿Desea borrarlo?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.eliminarHospital(hospital._id)
          .subscribe(resp => {
            Swal.fire('Eliminado', `El hospital ${hospital.nombre} ha sido eliminado`, 'success');
            this.obtenerHospitales();
          });
      }
    });
  }

  buscarHospital(termino: string) {
    if (termino.length === 0) {
      return this.hospitales = this.hospitalesTemp;
    }
    this.busquedasService.buscar('hospitales', termino)
      .subscribe((resultados: Hospital[]) => {
        this.hospitales = resultados;
      });
  }

  async abrirSweetAlert(){
    const { value  } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Ingrese el nombre del hospital',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      showCancelButton: true,
    })
    
    if (value && value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe((resp:any) => {
          this.hospitales.push(resp.hospital);
        });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }
}
