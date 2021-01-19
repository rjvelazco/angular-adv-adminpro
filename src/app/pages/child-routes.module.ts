import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Mantenimientos
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

// Guards
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
  { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Tema'}},
  { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda'}},
  { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica'}},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
  // { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
  // { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
  // { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
  
  // Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'hospitales'}},
  { path: 'medicos', component: MedicosComponent, data: {titulo: 'medicos'}},
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'medicos' } },
  
  // Rutas de Admin
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { titulo: 'usuarios' }
  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes)],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
