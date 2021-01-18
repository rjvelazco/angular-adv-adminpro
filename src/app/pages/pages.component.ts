import { Component, OnInit } from '@angular/core';

// Services
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['../../assets/css/pages/login-register-lock.css']
})
export class PagesComponent implements OnInit {

  
  constructor( 
    private settingsService: SettingsService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
