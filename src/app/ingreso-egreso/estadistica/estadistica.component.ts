import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../../models/ingreso-egreso.models';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChartData, ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

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
  public doughnutChartLabels: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.IngresoEgresoSubscription = this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.IngresoEgresoSubscription.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    for (const item of items) {
      if (item.tipo === 'Ingreso') {
        this.TotalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.TotalEgresos += item.monto;
        this.egresos++;
      }
    }
  }

  // events
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
