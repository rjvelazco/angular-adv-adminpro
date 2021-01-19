import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

// Environments
import { environment } from '../../environments/environment';

// Models
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private http: HttpClient
  ) { }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  obtenerMedicos(desde?: number) {
    // /medicos

    return this.http.get<any>(`${base_url}/medicos?desde=${desde | 0}`, this.headers)
      .pipe(
        map((resp: {ok: boolean, medicos: Medico[], total: number })=> {
          return {
            medicos: resp.medicos,
            total: resp.total
          }
        })
      );

  }

  obtenerMedicoById(id:string) {
    return this.http.get(`${base_url}/medicos/${id}`, this.headers)
      .pipe(
        map((resp: any): Medico => {
          return resp.medico
        }),
        // catchError(err => of(null))
      )
  }

  crearMedico(medico: { nombre: string, hospital: string }) {
    console.log(medico);
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers)
      .pipe(
        map((resp:any) => {
          return resp.medico;
        })
      )
  }

  actualizarMedico(medico: Medico) {
    // console.log(medico);
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  eliminarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }


}
