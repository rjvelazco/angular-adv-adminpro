import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      url: '/',
      icon: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url: '/'},
        {titulo: 'Graficas', url: 'grafica1'},
        {titulo: 'ProgressBar', url: 'progress'},
        {titulo: 'Promesas', url: 'promesas'},
        {titulo: 'Rxjs', url: 'rxjs'},
      ]
    },
    {
      titulo: 'Mantenimiento',
      url: 'usuarios',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: 'usuarios'},
        {titulo: 'Hospitales', url: 'hospitales'},
        {titulo: 'Medicos', url: 'medicos'},
      ]
    }
  ]

  constructor() { }
}
