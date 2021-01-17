import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from '../guards/auth.guard';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Tema de la Aplicacion'}},
      { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica'}},
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
      { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
      { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
      
      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'usuarios'}},
      { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'hospitales'}},
      { path: 'medicos', component: MedicosComponent, data: {titulo: 'medicos'}},
      { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'medicos'}},
      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
