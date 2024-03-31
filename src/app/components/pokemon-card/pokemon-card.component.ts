import {Component, Input, OnChanges, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {PokeapiResult} from "../../interfaces/pokeapi";
import {NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {PokeapiService} from "../../services/pokeapi.service";
import {HttpErrorResponse} from "@angular/common/http";
import {PokemonData} from "../../interfaces/pokemon";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe,
    NgClass
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent implements OnChanges{

  constructor(private pokeapiService: PokeapiService) { }

  @Input() data?: PokeapiResult | undefined;
  @Input() isSelected?: boolean = false;
  @Output() pokemonClicked = new EventEmitter<string>();
  id:string = "0";

  ngOnChanges(changes: SimpleChanges): void {
    this.extractInfoFromUrl()
  }

  extractInfoFromUrl() {
    if (this.data) {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
      this.pokeapiService.getById(this.id).subscribe({
        next: (response: PokemonData) => {
          console.log(response)
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          console.error(error);
        }
      });
    }
  }
}
