import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RideModalComponent } from '../ride-modal/ride-modal.component';
import { ItemReorderEventDetail } from '@ionic/angular';
import { TabsService } from 'src/app/tabs/tabs.service';
@Component({
  selector: 'app-ride-route-modal',
  templateUrl: './ride-route-modal.component.html',
  styleUrls: ['./ride-route-modal.component.scss']
})
export class RideRouteModalComponent implements OnInit {
  routes = [{}];
  dragging = false;

  constructor(private modalCtrl: ModalController, private tabsSvc:TabsService) {}

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
    this.dragging = false;
  }

  ngOnInit() {}

  addRoute() {
    this.routes.push({});
  }

  removeRoute(route: any) {
    this.routes.pop();
  }

  closeModal() {
    this.tabsSvc.setVisibilityNavBar(true);
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

}
