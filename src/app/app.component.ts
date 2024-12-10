import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LeafletMapComponent} from './leaflet-map/leaflet-map.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {PostService} from './post.service';
import {FormBuilder} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ShowResultsComponent} from './show-results/show-results.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeafletMapComponent, SearchFormComponent, SignInComponent, ShowResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

// interface Post {
//   useId:number;
//   id: number;
//   title: string;
//   body: string;
// }
export class AppComponent {
  title = 'bangladesh';
  postService = inject (PostService);
  // posts:Post[]=[];
  posts:any =[];
  constructor() {
    // this.postService.getPosts().subscribe({
    //   next: (data: any)=> {
    //     console.log(data.geoData?.features[0].geometry.coordinates)
    //     this.posts = data.geoData?.features[0].geometry.coordinates;
    //   },
    //   error: (err:any)=>{
    //     console.log(err);
    //   }
    // });
  }







}
