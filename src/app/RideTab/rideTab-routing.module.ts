import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { rideTabPage } from './rideTab.page';

const routes: Routes = [
  {
    path: '',
    component: rideTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class rideTabPageRoutingModule {}
