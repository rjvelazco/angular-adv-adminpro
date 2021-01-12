import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

type Tipos = 'usuarios' | 'medicos' | 'hospitales';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: Tipos;
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(tipo: Tipos, id: string, img: string = 'no-image') {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // this.img = img;

    // http://localhost:8080/api/upload/usuarios/no-image

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }

  }

  cerrarModal() {
    this._ocultarModal = true;
  }


}
