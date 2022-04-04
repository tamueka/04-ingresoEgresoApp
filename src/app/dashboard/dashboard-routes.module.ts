import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashBoardRoutes } from './dashboard.routes';
// import { AuthGuard } from '../services/auth.guard';

const rutasHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashBoardRoutes,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(rutasHijas)],
  exports: [RouterModule],
})
export class DashboardRoutesModule {}
