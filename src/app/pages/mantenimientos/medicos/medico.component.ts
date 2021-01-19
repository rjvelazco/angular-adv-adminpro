import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

// Servicies
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

// Models
import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit, OnDestroy {

  public medicoForm: FormGroup;
  public hospitales: Hospital[];

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  public imgSubs: Subscription;
  public id: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private medicoService: MedicoService,
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService
    ) { }

  ngOnInit(): void {
    
    this.cargarHospitales();
    
    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
      
    });
    
    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
      });
    
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      ).subscribe(img => this.cargarMedico(this.id));
    
    this.activatedRoute.params
      .subscribe(({ id }) => { this.cargarMedico(id); this.id = id; });
  }

  ngOnDestroy(): void{
    this.imgSubs.unsubscribe();
  }

  cargarMedico(id: string) {
    
    if (id === 'nuevo') { return; }
    
    this.medicoService.obtenerMedicoById(id)
      .pipe(
        delay(100)
      )
      .subscribe((medico: Medico) => {
        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }
        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      })
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) { 
      // Actualizar
      const data = {
        ... this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', `${nombre} ha sido atualizado correctamente`, 'success');
        })
    } else {
      // Crear
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((medico: Medico) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${medico._id}`);
        })
      // console.log(this.imgHospital);
    }

  }

  cargarHospitales() {
    this.hospitalService.obtenerHospitalesTodos()
      .subscribe((hospitales) => {
        this.hospitales = hospitales;
      })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

}
