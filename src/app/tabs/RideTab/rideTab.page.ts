import { AfterContentInit, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rideTab',
  templateUrl: 'rideTab.page.html',
  styleUrls: ['rideTab.page.scss']
})
export class rideTabPage implements AfterContentInit {

  constructor(private modalCtrl: ModalController) {

  }

  ngAfterContentInit(){
  }




}
