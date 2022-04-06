import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  ingresosSubscription: Subscription;
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('user')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        this.ingresosSubscription = this.ingresoEgresoService
          .initIngresosEgresosListener(user.uid)
          .subscribe((ingresosEgresosFB) => {
            this.store.dispatch(
              ingresoEgresoActions.setItems({ items: ingresosEgresosFB })
            );
          });
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.ingresosSubscription?.unsubscribe();
  }
}
