import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { rideTabPage } from './rideTab.page';

import { rideTabPageRoutingModule } from './rideTab-routing.module';
import { GoogleMapsComponent } from '../components/google-maps/google-maps.component';
import { RideModalComponent } from '../components/ride-modal/ride-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    rideTabPageRoutingModule
  ],
  declarations: [rideTabPage, GoogleMapsComponent, RideModalComponent]
})
export class RideTabPageModule {}
