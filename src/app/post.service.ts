import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // Base URLs for API endpoints
  private apiUrl = 'http://192.168.0.172:8083/api/divisions/geojson?name=';
  private genericUrl = 'http://192.168.0.172:8083/api/generic/search?prefix=';

  constructor(private http: HttpClient) {}
  // Method to fetch divisions boundary based on name
  getPosts(name: string): Observable<any> {
    const apiUrl = `${this.apiUrl}${name}`;
    return this.http.get(apiUrl);
  }
  // Method to fetch generic suggestions based on query
  getGenericSuggestions(query: string): Observable<any> {
    const url = `${this.genericUrl}${query}&limit=10`;
    return this.http.get(url);
  }

  // Method to fetch a post based on ID
  getPost(id: number) {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  createPost(post: any) {
    return this.http.post(this.apiUrl, post);
  }

  updatePost(post: any) {
    return this.http.put(`${this.apiUrl}${post.id}`, post);
  }
 // Method to delete a post based on ID
  deletePost(id: number) {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}


// http://192.168.0.172:8083/api/generic/search?prefix=a&limit=10

//   for Query Param
//   getPostsWithParams(userId: number) {
//     let params = new HttpParams().set('userId', userId);
//     return this.http.get(this.apiUrl, {params});
//   }









