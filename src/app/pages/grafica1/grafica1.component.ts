import { Component, OnInit } from '@angular/core';

import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public polarAreaChartLabels: Label[] = ['Usuario', 'Medicos', 'Hospitales'];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor(
    private busquedaServices: BusquedasService
  ) { }

  ngOnInit() {
    
    this.busquedaServices.cantidadRegistros()
    .subscribe((totales: any) => { 
      this.polarAreaChartData.push(totales.totalUsuarios);
      this.polarAreaChartData.push(totales.totalMedicos);
      this.polarAreaChartData.push(totales.totalHospitales);
    });
  }


}
