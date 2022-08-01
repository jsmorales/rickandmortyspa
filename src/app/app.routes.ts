
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import {RickSearchComponent} from "./components/rick-search/rick-search.component";

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, redirectTo: 'rickSearch'},
  { path: 'rickSearch', component: RickSearchComponent},
  { path: 'about', component: AboutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
