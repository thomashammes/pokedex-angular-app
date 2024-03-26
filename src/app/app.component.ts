import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PokemonInfoComponent} from "./pokemon-info/pokemon-info.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex-angular-app';
}
