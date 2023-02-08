import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DeliveryModalComponent } from '../components/delivery-modal/delivery-modal.component';
import { RideModalComponent } from '../components/ride-modal/ride-modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  public actualTab = 'ride';

  constructor(private modalCtrl: ModalController, private location: Location) {}

  ngOnInit() {
    this.modalCtrl.dismiss();
    this.openModal();
    this.location.onUrlChange((url: string) => {
      this.modalCtrl.dismiss();
     this.actualTab = url.split('/')[2]
     this.openModal();
    }
    );
  }

  async openModal() {
    if(this.actualTab === 'ride') {
      this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: RideModalComponent,
      initialBreakpoint: 0.5,
      breakpoints: [0.5, 0.3, 0.8],
      backdropDismiss: false,
      backdropBreakpoint: 0,
      showBackdrop: false,
    });
    await modal.present();
  }

  if(this.actualTab == 'delivery'){
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: DeliveryModalComponent,
      initialBreakpoint: 0.5,
      breakpoints: [0.5, 0.3, 0.8],
      backdropDismiss: false,
      backdropBreakpoint: 0,
      showBackdrop: false
    });
    await modal.present();
  }

  }
}
