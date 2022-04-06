import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../../models/ingreso-egreso.models';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWhitIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  IngresoEgresos: IngresoEgreso[] = [];
  IngresoEgresoSubscription: Subscription;

  ingresos = 0;
  egresos = 0;
  TotalIngresos = 0;
  TotalEgresos = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppStateWhitIngresoEgreso>) {}

  ngOnInit(): void {
    this.IngresoEgresoSubscription = this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.IngresoEgresoSubscription.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    // inicializamos valores para la estadististica
    this.ingresos = 0;
    this.egresos = 0;
    this.TotalIngresos = 0;
    this.TotalEgresos = 0;

    for (const item of items) {
      if (item.tipo === 'Ingreso') {
        this.TotalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.TotalEgresos += item.monto;
        this.egresos++;
      }
    }
    // introducimos valores en la grafica
    this.doughnutChartData = [[this.TotalIngresos, this.TotalEgresos]];
  }

  // events grafic
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
