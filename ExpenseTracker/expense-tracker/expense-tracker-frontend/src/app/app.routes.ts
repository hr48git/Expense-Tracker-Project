import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { VisualizeComponent } from './visualize/visualize.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'add-expense',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./add-expense/add-expense').then(m => m.AddExpenseComponent)
  },
  {
    path: 'expenses',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./expense-list/expense-list').then(m => m.ExpenseListComponent)
  },
  {
    path: 'visualize',
    component: VisualizeComponent
  }  

];
