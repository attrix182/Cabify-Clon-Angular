import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { rideTabPageRoutingModule } from './rideTab-routing.module';
import { rideTabPage } from './rideTab.page';
import { RideModalComponent } from 'src/app/components/ride-modal/ride-modal.component';
import { RideRouteModalComponent } from 'src/app/components/ride-route-modal/ride-route-modal.component';

@NgModule({
  declarations: [rideTabPage, RideModalComponent, RideRouteModalComponent],
  imports: [IonicModule, CommonModule, FormsModule, rideTabPageRoutingModule]
})
export class RideTabPageModule {}
