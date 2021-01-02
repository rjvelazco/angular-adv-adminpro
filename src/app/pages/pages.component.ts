import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['../../assets/css/pages/login-register-lock.css']
})
export class PagesComponent implements OnInit {

  
  constructor( 
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
