import { AfterViewInit, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-open-map',
  templateUrl: './open-map.component.html',
  styleUrls: ['./open-map.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule]
})
export class OpenMapComponent implements AfterViewInit {
  map: Map;
  actualPosition = [50.5, 30.5] as [number, number];

  constructor(public http: HttpClient, public plt: Platform, public router: Router) {}

  async ngAfterViewInit() {

    const coords = (await Geolocation.getCurrentPosition()).coords;
    this.actualPosition = [coords.latitude, coords.longitude ] as [number, number];

    setTimeout(() => {
    this.plt.ready().then(() => {
      this.initMap();
    });
  }, 20);
  }


  initMap(): void {
    this.map = new Map('map').setView(this.actualPosition, 23);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    L.marker([50.5, 30.5]).addTo(this.map);

    tiles.addTo(this.map);
  }
}
