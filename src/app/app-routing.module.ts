import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesDataComponent } from './countries-data/countries-data.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
