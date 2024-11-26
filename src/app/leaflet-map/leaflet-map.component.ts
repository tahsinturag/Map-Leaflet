import { Component, OnInit } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit {
  private map: any;

  ngOnInit(): void {
    this.map = L.map('map').setView([23.8103, 90.4125], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    const cities = [
      { name: 'Dhaka', lat: 23.8103, lng: 90.4125 },
      { name: 'Chattogram', lat: 22.3569, lng: 91.7832 },
      { name: 'Khulna', lat: 22.8456, lng: 89.5403 },
      { name: 'Rajshahi', lat: 24.3636, lng: 88.6241 },
      { name: 'Sylhet', lat: 24.9045, lng: 91.8611 },
      { name: 'Barishal', lat: 22.7010, lng: 90.3535 },
      { name: 'Rangpur', lat: 25.7439, lng: 89.2752 },
      { name: 'Mymensingh', lat: 24.7471, lng: 90.4203 }
    ];

    cities.forEach(city => {
      L.marker([city.lat, city.lng]).addTo(this.map)
        .bindPopup(`<b>${city.name}</b>`);
    });
  }
}
