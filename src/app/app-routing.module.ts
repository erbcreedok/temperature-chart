import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {Page404Component} from './page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: 'temperature', pathMatch: 'full' },
  { path: 'temperature', loadChildren: './temperature/temperature.module#TemperatureModule'},
  { path: 'precipitation', loadChildren: './precipitation/precipitation.module#PrecipitationModule'},
  { path: 'not-found', component: Page404Component },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
