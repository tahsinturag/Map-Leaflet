import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostService {



  // Base URLs for API endpoints
  // private apiUrl = 'http://192.168.0.172:8083/api/divisions/geojson?name=';
  private apiUrl = 'http://192.168.0.172:8083/api/division/boundary?name=';

  private genericUrl = 'http://192.168.0.172:8083/api/generic/search?prefix=';

  private demographicUrl = 'http://192.168.0.109:8083/api/sales-info/demographic';
  // API endpoint for fetching demographic data.
  constructor(private http: HttpClient) {}

  getPosts(name: string): Observable<any> {
    const apiUrl = `${this.apiUrl}${name}`;
    return this.http.get(apiUrl);
  }

  getGenericSuggestions(query: string): Observable<any> {
    const url = `${this.genericUrl}${query}&limit=10`;
    return this.http.get(url);
  }

  getDemographicData(
    genericId: number,
    vendorId: number,
    startDate: string,
    endDate: string
  ): Observable<any> {
    // Returns an observable of the API response.
    const params = {
      genericId: genericId.toString(),
      vendorId: vendorId.toString(),
      startDate,
      endDate,
    };

    return this.http.get(this.demographicUrl, { params });
    // Makes an HTTP GET request to the demographic API endpoint with query parameters and returns an observable.
  }
}
