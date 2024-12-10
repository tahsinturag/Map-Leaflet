import {Component, OnInit} from '@angular/core';
import L from 'leaflet';
import {SearchFormComponent} from '../search-form/search-form.component';
import {PostService} from '../post.service';


@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [SearchFormComponent],
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})

export class LeafletMapComponent implements OnInit {
  public isOpenSearchForm: boolean = false;
  private map: any;
  private cities = [
    {name: 'Dhaka', lat: 23.8103, lng: 90.4125},
    {name: 'Chittagong', lat: 22.3569, lng: 91.7832},
    {name: 'Khulna', lat: 22.8456, lng: 89.5403},
    {name: 'Rajshahi', lat: 24.3636, lng: 88.6241},
    {name: 'Sylhet', lat: 24.9045, lng: 91.8611},
    {name: 'Barishal', lat: 22.7010, lng: 90.3535},
    {name: 'Rangpur', lat: 25.7439, lng: 89.2752},
    {name: 'Mymensingh', lat: 24.7471, lng: 90.4203}
  ];


  private cityMarkers: any[] = [];
  public temp: any;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {

    // Initialize map and set default view
    this.map = L.map('map').setView([23.8103, 90.4125], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.cities.forEach(city => {
      let marker = L.marker([city.lat, city.lng]).addTo(this.map)
        .bindPopup(`<b>${city.name}</b>`);
      this.cityMarkers.push(marker);
      marker.on('click', () => {
        this.temp = city.name;
        this.flyToCity(city.lat, city.lng, 8);
      });
    });
  }


  private currentLayer: any;

  flyToCity(lat: number, lng: number, zoom: number): void {
    this.map.flyTo([lat, lng], zoom, {
      duration: 0.5
    });
    // API call
    this.postService.getPosts(this.temp).subscribe({
      next: (data: any) => {
        console.log(data);

        // Remove the previous layer, if it exists
        if (this.currentLayer) {
          this.map.removeLayer(this.currentLayer);
        }

        this.currentLayer = L.geoJSON(data.geoData, {
          style: function (feature) {
            return {
              color: 'blue',
              weight: 1.5,
              fillOpacity: 0.2,
              fillColor: "#6386d9",
            };
          }
        }).addTo(this.map);

        const divisionZoom = data.zoomVal || zoom;
        const divisionCoordinates = data.centerCoordinates || [lat, lng];
        this.map.flyTo(divisionCoordinates, divisionZoom, {
          duration: 0.5 // Duration of the fly animation in seconds
        });
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });

  }


  openModal() {
    this.isOpenSearchForm = true;
  }

  closeModal() {
    this.isOpenSearchForm = false;
  }
}

// searchHandler(searchData: any) {
//   console.log('searchData', searchData);
//   // this.mapService.search(searchData).subscribe({
//   //   next: (response) => {
//   //     console.log('response', response);
//       // this.storeDivisionsList = response;
//       // this.divisionsList = response;
//     },
//     error: (error) => {
//       console.error(error);
//     },
//   });
//   }
// }


