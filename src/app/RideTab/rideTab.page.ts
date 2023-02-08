import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RideModalComponent } from '../components/ride-modal/ride-modal.component';

@Component({
  selector: 'app-rideTab',
  templateUrl: 'rideTab.page.html',
  styleUrls: ['rideTab.page.scss']
})
export class rideTabPage implements AfterContentInit {

  constructor(private modalCtrl: ModalController) {

  }

  ngAfterContentInit(){
    this.openModal();
  }


  async openModal() {
    const modal = await this.modalCtrl.create({
      component: RideModalComponent,
      initialBreakpoint: 0.5,
      breakpoints: [0.5, 0.25, 0.85],
      backdropDismiss: false,
      backdropBreakpoint: 0,
      showBackdrop: false,
    });

    await modal.present();
  }


}