import { Component, OnInit } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class LeafletMapComponent implements OnInit {
  private map: any;

  ngOnInit(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    const marker = L.marker([51.5, -0.09]).addTo(this.map);

  }
}
