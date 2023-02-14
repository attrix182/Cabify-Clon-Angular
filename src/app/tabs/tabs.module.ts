import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { GoogleMapsComponent } from '../shared/google-maps/google-maps.component';
import { OpenMapComponent } from '../shared/open-map/open-map.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    GoogleMapsComponent,
    OpenMapComponent,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
