import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DeliveryModalComponent } from '../components/delivery-modal/delivery-modal.component';
import { RideModalComponent } from '../components/ride-modal/ride-modal.component';
import { TabsService } from './tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  public actualTab = 'ride';
  public visibilityNavBar = true;

  constructor(private modalCtrl: ModalController, private location: Location, private tabsSvc: TabsService) {}

  ngOnInit() {

    this.modalCtrl.dismiss();
    this.openModal();
    this.location.onUrlChange((url: string) => {
      this.modalCtrl.dismiss();
      this.actualTab = url.split('/')[2];
      this.openModal();
    });
  }

  getVisibility(){
    this.tabsSvc.getVisibilityNavBar().subscribe(
      (data) => {
        this.visibilityNavBar = data;
      }
    )
  }

  async openModal() {
    this.getVisibility();
    if (this.actualTab === 'ride') {
      this.modalCtrl.dismiss();
      this.modalCtrl
        .create({
          component: RideModalComponent,
          initialBreakpoint: 0.5,
          breakpoints: [0.5, 0.25, 0.8],
          backdropDismiss: false,
          backdropBreakpoint: 0,
          showBackdrop: false
        })
        .then((modal) => {
          modal.present();
        });
    }

    if (this.actualTab == 'delivery') {
      this.modalCtrl.dismiss();
      this.modalCtrl
        .create({
          component: DeliveryModalComponent,
          initialBreakpoint: 0.5,
          breakpoints: [0.5, 0.25, 0.8],
          backdropDismiss: false,
          backdropBreakpoint: 0,
          showBackdrop: false
        })
        .then((modal) => {
          modal.present();
        });
    }
  }
}
