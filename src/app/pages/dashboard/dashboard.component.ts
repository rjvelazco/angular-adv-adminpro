import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public label1: string[] = ['Usuarios', 'Medicos', 'Hospitales'];
  public data1 : number[] = [100, 200, 300];

  constructor() { }

  ngOnInit(): void {
  }

}
