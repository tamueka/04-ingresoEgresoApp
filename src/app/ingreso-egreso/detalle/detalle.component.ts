import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  IngresosEgresosSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.IngresosEgresosSubscription = this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => (this.ingresosEgresos = items));
  }

  ngOnDestroy(): void {
    this.IngresosEgresosSubscription.unsubscribe();
  }

  borrar(uid: string) {
    console.log(uid);
  }
}
