import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
  }

}
