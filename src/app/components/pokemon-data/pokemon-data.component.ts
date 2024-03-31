import {Component, OnInit} from '@angular/core'
import {PokeapiService} from "../../services/pokeapi.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";



@Component({
  selector: 'app-pokemon-data',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './pokemon-data.component.html'
})

export class PokemonDataComponent implements OnInit {

  public pokemonList: any | undefined;

  constructor(private pokeApiService: PokeapiService) { }

  ngOnInit() {
    this.getDittoTest();
  }

  public getDittoTest(): void {
    this.pokeApiService.getDittoTest().subscribe({
      next: (response: any) => {
        console.log(response);
        this.pokemonList = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    })
  }

}
