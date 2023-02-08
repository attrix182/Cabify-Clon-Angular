import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delivery-modal',
  templateUrl: './delivery-modal.component.html',
  styleUrls: ['./delivery-modal.component.scss'],
})
export class DeliveryModalComponent implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  enterRoute(){
    this.modalCtrl.dismiss();
  }

}
