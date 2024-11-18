import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CountryDetailsComponent } from './country-details/country-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomePageComponent},
  { path: 'country/:code', component: CountryDetailsComponent },
];
