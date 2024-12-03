import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() {
  }

  private apiUrl ='http://192.168.0.172:8083/api/divisions/geojson?name=sylhet';
//   http://192.168.0.172:8080/task/38/delete SAMPLE
//   {{local}}/api/generic/search?prefix=a&limit=10


  http = inject(HttpClient);

  getPosts() {
    return this.http.get<any>(this.apiUrl);
  }

  getPost(id: number) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  createPost(post: any) {
    return this.http.post(this.apiUrl, post);
  }

  UpdatePost(post: any) {
    return this.http.put(this.apiUrl + '/' + post.id, post);
  }

  DeletePost(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

//   for Query Param
//   getPostsWithParams(userId: number) {
//     let params = new HttpParams().set('userId', userId);
//     return this.http.get(this.apiUrl, {params});
//   }

}
