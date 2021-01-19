import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {


  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: "ADMIN_ROLE"|"USER_ROLE",
    public uid?: string,
    public tareas?: string[]
  ) { }
  
  get imagenUrl() {
    // upload/usuarios/no-image
    if (this.img && this.img.includes('https')) {
      return this.img;
    } else {
      return (this.img) ? `${base_url}/upload/usuarios/${this.img}` :
        `${base_url}/upload/usuarios/no-image`;
    }
  }


}