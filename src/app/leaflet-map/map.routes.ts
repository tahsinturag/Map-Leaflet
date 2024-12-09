import { Routes } from '@angular/router';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';
// import { LeafletMapComponent } from './containers/leaflet-map-container/leaflet-map-container.component';

export const mapRoutes: Routes = [
  {
    path: '',
    component: LeafletMapComponent,
  },
];
