import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
    // v14: Accessible Route Title Property
    title: 'AgileSprint — Real-Time Sprint Workspaces'
  },
  {
    path: '**',
    redirectTo: ''
  }
];