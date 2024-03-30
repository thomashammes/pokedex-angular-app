import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PokeapiResult} from "../../interfaces/pokeapi";
import {NgIf, TitleCasePipe} from "@angular/common";
import {PokeapiService} from "../../services/pokeapi.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent implements OnChanges{

  constructor(private pokeapiService: PokeapiService) { }

  @Input() data?:PokeapiResult | undefined;
  id:string = "0";

  ngOnChanges(changes: SimpleChanges): void {
    this.extractInfoFromUrl()
  }

  extractInfoFromUrl() {
    if (this.data) {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
      this.pokeapiService.getById(this.id).subscribe({
        next: (response: any) => {
          console.log(response.sprites.front_default)

        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          console.error(error);
        }
      });;
    }
  }
}
