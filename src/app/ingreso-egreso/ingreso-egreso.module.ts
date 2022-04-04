import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';

// Modulos
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';

// Pipes
import { OrdenarIngresoPipe } from '../pipes/ordenar-ingreso.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenarIngresoPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, ChartsModule, SharedModule],
})
export class IngresoEgresoModule {}
