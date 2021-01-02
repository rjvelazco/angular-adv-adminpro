import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() { 
    const theme = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme.setAttribute('href', theme );
  }

  changeTheme(theme: string,):void {
    const url: string = `./assets/css/colors/${theme}.css`
    this.linkTheme.setAttribute('href', url);
    
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  // checkCurrentTheme(links: NodeListOf<any>)
  checkCurrentTheme(): void {

    const links: NodeListOf<any> = document.querySelectorAll('.selector');
    
    links.forEach(elem => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme: string = this.linkTheme.getAttribute('href');

      if (currentTheme === btnThemeUrl) {
        elem.classList.add('working');
      }
    });

  }
}
