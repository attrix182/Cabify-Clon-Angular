import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryTabPage } from './deliveryTab.page';


const routes: Routes = [
  {
    path: '',
    component: DeliveryTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryTabPageRoutingModule {}
