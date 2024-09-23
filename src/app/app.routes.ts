import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { TipoCambioComponent } from './pages/tipo-cambio/tipo-cambio.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Asegúrate de usar pathMatch
  { path: 'login', component: LoginComponent },
  { path: 'cambio', component: TipoCambioComponent },
];
