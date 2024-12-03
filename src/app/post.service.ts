import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://192.168.0.172:8083/api/divisions/geojson?name=';

  constructor(private http: HttpClient) {}

  getPosts(name: string): Observable<any> {
    const apiUrl = `${this.apiUrl}${name}`;
    return this.http.get(apiUrl);
  }

  getPost(id: number) {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  createPost(post: any) {
    return this.http.post(this.apiUrl, post);
  }

  updatePost(post: any) {
    return this.http.put(`${this.apiUrl}${post.id}`, post);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}






  // private apiUrl ='http://192.168.0.172:8083/api/divisions/geojson?name=sylhet';
//   http://192.168.0.172:8080/task/38/delete SAMPLE
//   {{local}}/api/generic/search?prefix=a&limit=10




//   for Query Param
//   getPostsWithParams(userId: number) {
//     let params = new HttpParams().set('userId', userId);
//     return this.http.get(this.apiUrl, {params});
//   }


