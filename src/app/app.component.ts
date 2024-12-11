import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LeafletMapComponent} from './leaflet-map/leaflet-map.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {PostService} from './post.service';
import {ShowResultsComponent} from './show-results/show-results.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeafletMapComponent, SearchFormComponent, SignInComponent, ShowResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'bangladesh';
  postService = inject (PostService);
  posts:any =[];
  constructor() {

  }
}
