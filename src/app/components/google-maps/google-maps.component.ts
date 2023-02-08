import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { MapaStyle } from 'src/app/shared/MapaStyle';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  @Input() viewOnly = false;
  @Output() backEvent = new EventEmitter<boolean>();
  @Output() eventCoords = new EventEmitter();

  map: google.maps.Map;
  marker: google.maps.Marker;
  geocoder: google.maps.Geocoder;
  adressName = 'Ubicación actual';
  searchInput: HTMLInputElement;
  loader = new Loader({ apiKey: environment.apiKeyGoogle, version: 'weekly', libraries: ['places'] });
  actualPosition = { lat: -34.6154611, lng: -58.5733849 } as google.maps.LatLngLiteral;
  initialZoom = 10;

  constructor() {}

  async ngOnInit() {
    if (this.viewOnly) {
      return;
    }

    try {
      const coords = (await Geolocation.getCurrentPosition()).coords;
      this.actualPosition = { lat: coords.latitude, lng: coords.longitude };
      this.initialZoom = 16;
      this.loadMap();
    } catch (e) {
      this.loadMap();
      console.warn(e);
    }
  }

  async loadMap() {
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;
    this.loader
      .load()
      .then(async () => {
        this.setMap();
        this.geocoder = new google.maps.Geocoder();
        await this.markActualLocation(this.actualPosition);

      })
      .catch((e) => console.error(e));
  }

  async setMap() {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.actualPosition,
      zoom: this.initialZoom,
      minZoom: 4,
      maxZoom: 17,
      disableDefaultUI: true,
      mapTypeControl: false,
      clickableIcons: false,
      styles: MapaStyle
    });
    google.maps.event.addListener(this.map, 'click', () => this.searchInput.blur());
  }

  async markActualLocation(coordenadas: google.maps.LatLngLiteral) {
    if (this.searchInput) {
      await this.geocoder.geocode({ location: coordenadas }, (res) => {
        if (!res.length) return;
        this.searchInput.value = res[0].formatted_address;
        this.adressName = res[0].formatted_address;
      });
    }
    this.marker = new google.maps.Marker({
      position: coordenadas,
      map: this.map,
      title: this.adressName,
      draggable: false,
      icon: 'assets/icon/marker.png',
      animation: 4
    });
    this.map.setCenter(this.marker.getPosition());
    this.marker.setMap(this.map);
  }

  loadAdress() {
    let adress = {
      adressName: this.adressName,
      latLng: { lat: this.marker.getPosition().lat(), lng: this.marker.getPosition().lng() }
    };
    this.eventCoords.emit(adress);
    this.back();
  }

  back() {
    this.backEvent.emit(false);
  }
}
