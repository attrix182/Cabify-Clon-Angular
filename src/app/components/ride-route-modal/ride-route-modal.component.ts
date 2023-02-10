import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RideModalComponent } from '../ride-modal/ride-modal.component';

@Component({
  selector: 'app-ride-route-modal',
  templateUrl: './ride-route-modal.component.html',
  styleUrls: ['./ride-route-modal.component.scss'],
})
export class RideRouteModalComponent implements OnInit {


  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
    this.modalCtrl.create({
      component: RideModalComponent,
      initialBreakpoint: 0.5,
      breakpoints: [0.5, 0.25, 0.8],
      backdropDismiss: false,
      backdropBreakpoint: 0,
      showBackdrop: false,
    }
    ).then(modal => {
      modal.present();
    }
    );
  }

  enterRoute(){
    this.modalCtrl.dismiss();
  }

}
