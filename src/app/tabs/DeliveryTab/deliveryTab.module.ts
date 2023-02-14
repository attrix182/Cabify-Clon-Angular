import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryModalComponent } from '../../components/delivery-modal/delivery-modal.component';
import { DeliveryTabPage } from './deliveryTab.page';
import { DeliveryTabPageRoutingModule } from './deliveryTab-routing.module';
import { RoutesListComponent } from 'src/app/components/routes-list/routes-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DeliveryTabPageRoutingModule,
    RoutesListComponent
  ],
  declarations: [DeliveryTabPage, DeliveryModalComponent,
  ]
})
export class DeliveryTabPageModule {}
