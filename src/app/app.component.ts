import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LeafletMapComponent} from './leaflet-map/leaflet-map.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {DhakaComponent} from './dhaka/dhaka.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeafletMapComponent, SearchFormComponent, SignInComponent, DhakaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bangladesh';



}
