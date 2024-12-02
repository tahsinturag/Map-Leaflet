import { Component, OnInit } from '@angular/core';
import L from 'leaflet';
import boundaryData from './dhaka_boundary_with_way_id.json';

@Component({
  selector: 'app-dhaka',
  standalone: true,
  imports: [],
  templateUrl: './dhaka.component.html',
  styleUrl: './dhaka.component.css'
})


export class DhakaComponent implements OnInit {
  private map: any;

  ngOnInit(): void {
    this.map = L.map('map').setView([23.8103, 90.4125], 8); // Center on Dhaka with zoom level 8

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Render the boundary using the JSON file
    this.renderBoundary();
  }

  private renderBoundary(): void {
    // Iterate through the boundary data and add filtered polygons to the map
    boundaryData.forEach((segment: any) => {
      const coordinates = segment.nodes.map((node: any) => [node.latitude, node.longitude]);

      // Filter out invalid or unwanted straight-line segments
      if (this.isValidSegment(coordinates)) {
        // Add the segment as a polyline (not polygon to avoid closing shapes)
        const polyline = L.polyline(coordinates, { color: 'blue', weight: 2 });
        polyline.addTo(this.map);
      }
    });

    // Fit the map view to the boundary
    const allCoordinates = boundaryData.flatMap((segment: any) =>
      segment.nodes.map((node: any) => [node.latitude, node.longitude])
    );
    const bounds = L.latLngBounds(allCoordinates);
    this.map.fitBounds(bounds);
  }

  // Function to check if a segment is valid
  private isValidSegment(coordinates: [number, number][]): boolean {
    // Check if the segment has at least 2 distinct points
    if (coordinates.length < 2) return false;

    // Check for duplicate points or straight lines
    for (let i = 1; i < coordinates.length; i++) {
      const [lat1, lon1] = coordinates[i - 1];
      const [lat2, lon2] = coordinates[i];

      // Skip if two consecutive points are the same
      if (lat1 === lat2 && lon1 === lon2) {
        return false;
      }
    }

    // If no issues, the segment is valid
    return true;
  }
}

