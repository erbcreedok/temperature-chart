import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureComponent } from './temperature.component';
import { TemperatureRoutingModule } from './temperature-routing.module';
import { TemperatureService } from './temperature.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TemperatureRoutingModule,
    SharedModule
  ],
  providers: [
    TemperatureService
  ],
  declarations: [TemperatureComponent]
})
export class TemperatureModule { }
