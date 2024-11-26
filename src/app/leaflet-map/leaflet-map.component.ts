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


    //
    // const cities = [
    //   { name: 'Dhaka', lat: 23.8103, lng: 90.4125 },
    //   { name: 'Faridpur', lat: 23.5424, lng: 89.6309 },
    //   { name: 'Gazipur', lat: 24.0958, lng: 90.4125 },
    //   { name: 'Gopalganj', lat: 23.01324, lng: 89.82261},
    //   { name: 'Jamalpur', lat: 24.923025, lng:  89.950111 },
    //   { name: 'Kishoreganj', lat: 24.4260, lng: 90.9821 },
    //   { name: 'Madaripur', lat: 23.2393, lng: 90.1870 },
    //   { name: 'Manikganj', lat: 23.8617, lng: 90.0003 },
    //   { name: 'Munshiganj', lat: 23.4981, lng: 90.4127 },
    //   { name: 'Mymensingh', lat: 24.7434, lng: 90.3984 },
    //   { name: 'Narayanganj', lat: 23.6226, lng: 90.4998 },
    //   { name: 'Narsingdi', lat: 24.1344, lng: 90.7860 },
    //   { name: 'Netrokona', lat: 24.8103, lng: 90.8656 },
    //   { name: 'Rajbari', lat: 23.7151, lng: 89.5875 },
    //   { name: 'Shariatpur', lat: 23.2423, lng: 90.4348 },
    //   { name: 'Sherpur', lat: 25.0746, lng: 90.1495 },
    //   { name: 'Tangail', lat: 24.2450, lng: 89.9113 },
    //   { name: 'Bogra', lat: 24.8436, lng: 89.3701 },
    //   { name: 'Joypurhat', lat: 25.0947, lng: 89.0945 },
    //   { name: 'Naogaon', lat: 24.9132, lng: 88.7531 },
    //   { name: 'Natore', lat: 24.4102, lng: 89.0076 },
    //   { name: 'Nawabganj', lat: 24.95, lng: 88.383333 },
    //   { name: 'Pabna', lat: 24.0113, lng: 89.2562 },
    //   { name: 'Rajshahi', lat: 24.3636, lng: 88.6241 },
    //   { name: 'Sirajgonj', lat: 24.3141, lng: 89.5700 },
    //   { name: 'Dinajpur', lat: 25.6279, lng: 88.6332 },
    //   { name: 'Gaibandha', lat: 25.3297, lng: 89.5430 },
    //   { name: 'Kurigram', lat: 25.8072, lng: 89.6295 },
    //   { name: 'Lalmonirhat', lat: 25.9923, lng: 89.2847 },
    //   { name: 'Nilphamari', lat: 25.8483, lng: 88.9414 },
    //   { name: 'Panchagarh', lat: 26.2709, lng: 88.5952 },
    //   { name: 'Rangpur', lat: 25.7439, lng: 89.2752 },
    //   { name: 'Thakurgaon', lat: 26.0418, lng: 88.4283 },
    //   { name: 'Barguna', lat: 22.0953, lng: 90.1121 },
    //   { name: 'Barisal', lat: 22.7029, lng: 90.3466 },
    //   { name: 'Bhola', lat: 22.1785, lng: 90.7101 },
    //   { name: 'Jhalokati', lat: 22.5721, lng: 90.1870 },
    //   { name: 'Patuakhali', lat: 22.2249, lng: 90.4548 },
    //   { name: 'Pirojpur', lat: 22.5791, lng: 89.9759 },
    //   { name: 'Bandarban', lat: 21.8311, lng: 92.3686 },
    //   { name: 'Brahmanbaria', lat: 23.9608, lng: 91.1115 },
    //   { name: 'Chandpur', lat: 23.2513, lng: 90.8518 },
    //   { name: 'Chittagong', lat: 22.3475, lng: 91.8123 },
    //   { name: 'Comilla', lat: 23.4619, lng: 91.1869 },
    //   { name: 'CoxBazar', lat: 21.4395, lng: 92.0077 },
    //   { name: 'Feni', lat: 23.0159, lng: 91.3976 },
    //   { name: 'Khagrachari', lat: 23.1322, lng: 91.9490 },
    //   { name: 'Lakshmipur', lat: 22.9447, lng: 90.8282 },
    //   { name: 'Noakhali', lat: 22.8724, lng: 91.0973 },
    //   { name: 'Rangamati', lat: 22.7324, lng: 92.2985 },
    //   { name: 'Habiganj', lat: 24.4771, lng: 91.4507 },
    //   { name: 'Maulvibazar', lat: 24.3095, lng: 91.7315 },
    //   { name: 'Sunamganj', lat: 25.0715, lng: 91.3992 },
    //   { name: 'Sylhet', lat: 24.9045, lng: 91.8611 },
    //   { name: 'Bagerhat', lat: 22.6602, lng: 89.7895 },
    //   { name: 'Chuadanga', lat: 23.6161, lng: 88.8263 },
    //   { name: 'Jessore', lat: 23.1634, lng: 89.2182 },
    //   { name: 'Jhenaidah', lat: 23.5450, lng: 89.1726 },
    //   { name: 'Khulna', lat: 22.8456, lng: 89.5403 },
    //   { name: 'Kushtia', lat: 23.8907, lng: 89.1099 },
    //   { name: 'Magura', lat: 23.4855, lng: 89.4198 },
    //   { name: 'Meherpur', lat: 23.8052, lng: 88.6724 },
    //   { name: 'Narail', lat: 23.1657, lng: 89.4990 },
    //   { name: 'Satkhira', lat: 22.723406, lng: 89.075127 }
    // ];


    cities.forEach(city => {
      L.marker([city.lat, city.lng]).addTo(this.map)
        .bindPopup(`<b>${city.name}</b>`);
    });
  }
}
