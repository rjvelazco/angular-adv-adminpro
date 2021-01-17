import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

type Tipo = 'usuarios' | 'medicos' | 'hospitales';
const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string = 'no-image', tipo: Tipo ): string {
    // upload/usuarios/no-image
    if (img && img.includes('https')) {
      return img;
    } else {
      return `${base_url}/upload/${tipo}/${img}`;
    }
  }

}
