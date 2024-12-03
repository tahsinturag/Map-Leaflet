import {Component, OnInit} from '@angular/core';
import L from 'leaflet';
import { SearchFormComponent } from '../search-form/search-form.component';
import {PostService} from '../post.service';


@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [ SearchFormComponent],
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})

export class LeafletMapComponent implements OnInit {
  public isOpenSearchForm: boolean = false;
  private map: any;
  private cities = [
    {name: 'Dhaka', lat: 23.8103, lng: 90.4125},
    {name: 'Chattogram', lat: 22.3569, lng: 91.7832},
    {name: 'Khulna', lat: 22.8456, lng: 89.5403},
    {name: 'Rajshahi', lat: 24.3636, lng: 88.6241},
    {name: 'Sylhet', lat: 24.9045, lng: 91.8611},
    {name: 'Barishal', lat: 22.7010, lng: 90.3535},
    {name: 'Rangpur', lat: 25.7439, lng: 89.2752},
    {name: 'Mymensingh', lat: 24.7471, lng: 90.4203}
  ];


  private cityMarkers: any[] = [];

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
        this.flyToCity(city.lat, city.lng, 8);
      });
    });
  }


  flyToCity(lat: number, lng: number, zoom: number): void {
    this.map.flyTo([lat, lng], zoom, {
      duration: 1.5 // Duration of the fly animation in seconds
    });

    this.postService.getPosts().subscribe({
      next: (data: any)=> {
        // console.log(data.geoData?.features[0].geometry.coordinates)
        // this.posts = data.geoData?.features[0].geometry.coordinates;
        console.log(data)

        L.geoJSON(data.geoData, {
          style: function (feature) {
            return {
              color: "red", // Line color
              weight: 2, // Line thickness
              opacity: 0.7, // Line opacity
            };
          },
          onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.name_en) {
              layer.bindPopup("<b>" + feature.properties.name_en + "</b>");
            }
          },
        }).addTo(this.map);
      },
      error: (err:any)=>{
        console.log(err);
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



