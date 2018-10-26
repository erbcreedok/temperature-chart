import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrecipitationRoutingModule } from './precipitation-routing.module';
import { PrecipitationComponent } from './precipitation.component';
import { SharedModule } from '../shared/shared.module';
import {PrecipitationService} from './precipitation.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PrecipitationRoutingModule,
    SharedModule
  ],
  providers: [
    PrecipitationService
  ],
  declarations: [PrecipitationComponent]
})
export class PrecipitationModule { }
