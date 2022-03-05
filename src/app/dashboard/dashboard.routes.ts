import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';

export const dashBoardRoutes: Routes = [
  { path: '', component: EstadisticaComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: 'ingreso-egreso', component: IngresoEgresoComponent },
];
