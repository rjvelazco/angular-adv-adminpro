import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

// Classes
import { Usuario } from '../models/usuario.model';

// Environment
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  public busqueda: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
  ) { 
    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get role(): "ADMIN_ROLE"|"USER_ROLE"{
    return this.usuario.role;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu',JSON.stringify(menu));
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '36937013322-c99e98k6stt4jh4donuce6dks9bgiaj1.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, this.headers)
      .pipe(
        map((resp: any) => {
          const { uid, nombre, email, img = '', role, google, tareas = [] } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid, tareas);
          this.guardarLocalStorage(resp.token, resp.menu);
          return true;
        }),
        catchError(error => of(false))
      )
  }
  
  crearUsuario(formData: RegisterForm) {

    delete formData.password2;
    delete formData.terminos;

    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => this.guardarLocalStorage(resp.token, resp.menu))
      );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => this.guardarLocalStorage(resp.token, resp.menu))
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp: any) =>this.guardarLocalStorage(resp.token, resp.menu))
      );
  }

  actualizarPerfil(data: { email: string, nombre: string}) {
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  cargarUsuarios(desde: number = 0, limit:number = 5) {
    // http://localhost:8080/api/usuarios?desde=0&limit=22
    const url = `${base_url}/usuarios?desde=${desde}&limit=${limit}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map((user) => {
            return new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid);
          });
          return {
            total: resp.total,
            usuarios
          };
        })
      );
  }

  eliminarUsuario(uid:string) {
    // http://localhost:8080/api/usuarios/
    const url = `${base_url}/usuarios/${uid}`;
    return this.http.delete(url, this.headers);

  }

  guardarUsuario(usuario:Usuario) {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

  obtenerTareas() {
    return this.http.get(`${base_url}/usuarios/tareas`, this.headers)
      .pipe(
        map((resp: {ok: boolean, usuario: string, tareas: string[]}) => {
          return resp.tareas;
        }),
        catchError(error => of(false))
      )
  }

  agregarTarae(tarea: string) {
    // http://localhost:8080/api/usuarios/tarea
    const url = `${base_url}/usuarios/tarea`;
    return this.http.post(url, { tarea }, this.headers);
  }

  eliminarTarea(index: number) {
    // usuarios/tareas/0
    return this.http.delete(`${base_url}/usuarios/tareas/${index}`, this.headers);
  }

}
