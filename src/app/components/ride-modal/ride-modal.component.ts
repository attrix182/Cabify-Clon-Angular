import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TabsService } from 'src/app/tabs/tabs.service';
import { RideRouteModalComponent } from '../ride-route-modal/ride-route-modal.component';
@Component({
  selector: 'app-ride-modal',
  templateUrl: './ride-modal.component.html',
  styleUrls: ['./ride-modal.component.scss'],
})
export class RideModalComponent implements OnInit {

  constructor(private modalCtrl:ModalController, private tabsSvc:TabsService) { }

  ngOnInit() {
    this.enterRoute();
  }

  enterRoute(){
    this.tabsSvc.setVisibilityNavBar(false);
    this.modalCtrl.dismiss();
    this.modalCtrl.create({
      component: RideRouteModalComponent,
      cssClass: 'fullscreen'

    }
    ).then(modal => {
      modal.present();
    }
    );
  }

}
