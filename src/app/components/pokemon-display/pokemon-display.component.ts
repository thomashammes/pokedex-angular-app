import {Component, Input} from '@angular/core';
import {PokemonData} from "../../interfaces/pokemon";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {SpeciesData} from "../../interfaces/species";

@Component({
  selector: 'app-pokemon-display',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgOptimizedImage
  ],
  templateUrl: './pokemon-display.component.html',
  styleUrl: './pokemon-display.component.scss'
})
export class PokemonDisplayComponent  {

  @Input() pokemon?:PokemonData;

}
