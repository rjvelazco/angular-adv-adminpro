import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../models/usuario.model';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;
type Tipos = 'usuarios' | 'medicos' | 'hospitales';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    
    return resultados.map(usuario => {
      return new Usuario(usuario.nombre, usuario.email, '', usuario.img, usuario.google, usuario.role, usuario.uid);
    });
  }

  buscar( tipo:Tipos, termino: string='') {
    // http://localhost:8080/api/todo/coleccion/usuarios/e
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);
              break;
            case 'medicos':
              break;
            case 'hospitales':
              break;
          }

          
          
        })
      )
  }
}
