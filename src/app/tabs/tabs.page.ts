import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RideModalComponent } from '../components/ride-modal/ride-modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private modalCtrl: ModalController) {}

  async openModalRide() {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: RideModalComponent,
      initialBreakpoint: 0.5,
      breakpoints: [0.5, 0.3, 0.8],
      backdropDismiss: false,
      backdropBreakpoint: 0,
      showBackdrop: false
    });

    await modal.present();
  }
}
