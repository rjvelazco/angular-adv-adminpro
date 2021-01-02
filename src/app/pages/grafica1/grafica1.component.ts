import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public label1: string[] = ['Ventas', 'Perdidas', 'Ganancias'];
  public data1 : number[] = [100, 200, 300];

  public label2: string[] = ['Autos', 'Aviones', 'Barcos'];
  public data2 : number[] = [400, 500, 600];

  public label3: string[] = ['Play Station 5', 'Xbox X', 'PC Gamer'];
  public data3 : number[] = [150, 250, 350];

  public label4: string[] = ['Comics','Libro', 'Peliculas'];
  public data4 : number[] = [1000, 1200, 3000];

  constructor() { }

}
