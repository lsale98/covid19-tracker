import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CovidDataComponent } from './covid-data/covid-data.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path: '', component:HomepageComponent},
  {path:':iso2', component:CovidDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
