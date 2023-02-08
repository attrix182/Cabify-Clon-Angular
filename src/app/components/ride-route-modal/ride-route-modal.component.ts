import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ride-route-modal',
  templateUrl: './ride-route-modal.component.html',
  styleUrls: ['./ride-route-modal.component.scss'],
})
export class RideRouteModalComponent implements OnInit {


  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  enterRoute(){
    this.modalCtrl.dismiss();
  }

}
