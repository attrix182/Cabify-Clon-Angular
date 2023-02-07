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
  @Input() titulo: string = '';
  @Input() viewOnly = false;
  @Input() coordsGrua = { lat: -38.36245925272641, lng: -60.2929843759346 };
  @Output() volverAtrasMaps = new EventEmitter<boolean>();
  @Output() eventCoordenadas = new EventEmitter();

  map: google.maps.Map;
  marker: google.maps.Marker;
  geocoder: google.maps.Geocoder;
  nombreUbicacion = 'Ubicación actual';
  searchInput: HTMLInputElement;
  loader = new Loader({ apiKey: environment.apiKeyGoogle, version: 'weekly', libraries: ['places'] });
  defaultCoordenadas = { lat: -34.6154611, lng: -58.5733849 } as google.maps.LatLngLiteral;
  zoomInicial = 10;

  constructor() {}

  async ngOnInit() {
    if (this.viewOnly) {
      this.cargarMapaGrua();
      return;
    }

    try {
      const coords = (await Geolocation.getCurrentPosition()).coords;
      this.defaultCoordenadas = { lat: coords.latitude, lng: coords.longitude };
      this.zoomInicial = 16;
      this.cargarMapa();
    } catch (e) {
      this.cargarMapa();
      console.warn(e);
    }
  }

  async cargarMapaGrua() {
    this.loader.load().then(async () => {
      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: this.coordsGrua,
        zoom: this.zoomInicial,
        minZoom: 10,
        maxZoom: 17,
        disableDefaultUI: true,
        mapTypeControl: false,
        clickableIcons: false,
        styles: MapaStyle
      });

      await this.marcarUbicacionActual(this.coordsGrua);
    });
  }

  async cargarMapa() {
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;
    this.loader
      .load()
      .then(async () => {
        this.setMap();
        this.geocoder = new google.maps.Geocoder();
        await this.marcarUbicacionActual(this.defaultCoordenadas);
        this.cargarAutocomplete();
        this.onDragEnd();
        this.onCenterChanged();
        this.onCambioZoom();
      })
      .catch((e) => console.error(e));
  }

  async setMap() {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.defaultCoordenadas,
      zoom: this.zoomInicial,
      minZoom: 4,
      maxZoom: 17,
      disableDefaultUI: true,
      mapTypeControl: false,
      clickableIcons: false
    });

    // Evento invocado cuando se hace click en el mapa
    google.maps.event.addListener(this.map, 'click', () => this.searchInput.blur());
  }

  async marcarUbicacionActual(coordenadas: google.maps.LatLngLiteral) {
    if (this.searchInput) {
      await this.geocoder.geocode({ location: coordenadas }, (res) => {
        if (!res.length) return;
        this.searchInput.value = res[0].formatted_address;
        this.nombreUbicacion = res[0].formatted_address;
      });
    }
    this.marker = new google.maps.Marker({
      position: coordenadas,
      map: this.map,
      title: this.nombreUbicacion,
      draggable: false,
      icon: 'assets/icons/marker-map-selected.svg',
      animation: 4
    });
    this.map.setCenter(this.marker.getPosition());
    this.marker.setMap(this.map);
  }

  cargarAutocomplete() {
    const searchBox = new google.maps.places.SearchBox(this.searchInput);
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds() as google.maps.LatLngBounds);
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (!places.length) return;

      this.marker.setMap(null);
      this.marker = null;

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }

        // Crear un marker para el place
        this.marker = new google.maps.Marker({
          position: place.geometry.location,
          map: this.map,
          title: place.name,
          draggable: false,
          icon: 'assets/icons/marker-mi-ubicacion.svg',
          animation: 4
        });

        this.onDragEnd();

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  onDragEnd() {
    google.maps.event.addListener(this.map, 'dragend', () => {
      const center = this.map.getCenter();
      window.setTimeout(() => {
        this.geocoder.geocode({ location: center }, (res) => {
          if (res && res.length) {
            this.nombreUbicacion = res[0].formatted_address;
            this.searchInput.value = res[0].formatted_address;
          } else {
            this.nombreUbicacion = '';
            this.searchInput.value = 'No pudimos determinar la dirección';
          }
        });
      }, 100);
    });
  }

  onCenterChanged() {
    google.maps.event.addListener(this.map, 'center_changed', () => {
      const center = this.map.getCenter();
      window.setTimeout(() => this.marker.setPosition(center), 100);
    });
  }

  onCambioZoom() {
    google.maps.event.addListener(this.map, 'zoom_changed', () => {
      const center = this.map.getCenter();
      window.setTimeout(async () => {
        await this.geocoder.geocode({ location: { lat: center.lat(), lng: center.lng() } }, (res) => {
          if (!res || !res.length) return;
          this.searchInput.value = res[0].formatted_address;
          this.nombreUbicacion = res[0].formatted_address;
        });
      }, 500);
    });
  }

  cargarDireccion() {
    let ubicacion = {
      ubicacionNombre: this.nombreUbicacion,
      latLng: { lat: this.marker.getPosition().lat(), lng: this.marker.getPosition().lng() }
    };
    this.eventCoordenadas.emit(ubicacion);
    this.volverAtras();
  }

  volverAtras() {
    this.volverAtrasMaps.emit(false);
  }
}
