import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// vendor suggestion interface
interface VendorSuggestion {
  id: number;
  vendorName: string;
}

const BASE_API_URL = 'http://192.168.0.109:8083/api/';
// const BASE_API_URL = 'http://192.168.0.172:8083/api/';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  // API endpoints
  private boundaryUrl = `${BASE_API_URL}division/boundary?name=`;
  private genericUrl = `${BASE_API_URL}generic/search?prefix=`;
  private vendorUrl = `${BASE_API_URL}vendor/search?prefix=`;
  private demographicUrl = `${BASE_API_URL}sales-info/demographic`;

  constructor(private http: HttpClient) {}

  // For boundary region
  getPosts(name: string): Observable<any> {
    const boundaryUrl= `${this.boundaryUrl}${name}`;
    return this.http.get(boundaryUrl);
  }

  // For genericSuggestions
  getGenericSuggestions(query: string): Observable<any> {
    const url = `${this.genericUrl}${query}&limit=10`;
    return this.http.get(url);
  }

  // For vendor suggestions
  getVendorSuggestions(query: string): Observable<VendorSuggestion[]> {
    const url = `${this.vendorUrl}${query}&limit=10`;
    return this.http.get<VendorSuggestion[]>(url);
  }

  // For demographic
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
