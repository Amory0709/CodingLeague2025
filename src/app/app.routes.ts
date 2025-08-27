import { Routes } from '@angular/router';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home1/home1.component').then(m => m.Home1Component) },
  { path: 'home', loadComponent: () => import('./home1/home1.component').then(m => m.Home1Component) },
  { 
    path: 'register', 
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    canDeactivate: [CanDeactivateGuard]
  },
  { path: 'congrats', loadComponent: () => import('./congrats/congrats.component').then(m => m.CongratsComponent) },
  { path: 'home2', loadComponent: () => import('./home2/home2.component').then(m => m.Home2Component) },
  { 
    path: 'profile', 
    loadComponent: () => import('./profile-page/profile-page.component').then(m => m.ProfilePageComponent),
    canDeactivate: [CanDeactivateGuard]
  },
  { 
    path: 'interests', 
    loadComponent: () => import('./interests/interests.component').then(m => m.InterestsComponent),
    canDeactivate: [CanDeactivateGuard]
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
    canDeactivate: [CanDeactivateGuard]
  }
];