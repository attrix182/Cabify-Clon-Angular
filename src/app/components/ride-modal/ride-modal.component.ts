import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RideRouteModalComponent } from '../ride-route-modal/ride-route-modal.component';
@Component({
  selector: 'app-ride-modal',
  templateUrl: './ride-modal.component.html',
  styleUrls: ['./ride-modal.component.scss'],
})
export class RideModalComponent implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  enterRoute(){
    this.modalCtrl.dismiss();
    this.modalCtrl.create({
      component: RideRouteModalComponent,
      initialBreakpoint: 1,
      breakpoints: [1],
      backdropDismiss: false,
      backdropBreakpoint: 0,
      showBackdrop: false,
    }
    ).then(modal => {
      modal.present();
    }
    );
  }

}
