import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PokemonDataComponent} from "./components/pokemon-data/pokemon-data.component";
import {HomeComponent} from "./components/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonDataComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokedex-angular-app';
}
