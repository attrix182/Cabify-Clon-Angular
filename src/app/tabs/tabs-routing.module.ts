import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'ride',
        loadChildren: () => import('../tabs/RideTab/rideTab.module').then(m => m.RideTabPageModule)
      },
      {
        path: 'delivery',
        loadChildren: () => import('../tabs/DeliveryTab/deliveryTab.module').then(m => m.DeliveryTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/ride',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/ride',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
