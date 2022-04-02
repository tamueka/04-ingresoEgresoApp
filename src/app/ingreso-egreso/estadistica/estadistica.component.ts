import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../../models/ingreso-egreso.models';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs';

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
}
