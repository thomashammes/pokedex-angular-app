import {Component, OnInit} from '@angular/core';
import {PokeapiService} from "../../services/pokeapi.service";
import {PokemonData} from "../pokemon-data/pokemon-data";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {PokeapiResponse, PokeapiResult} from "../../interfaces/pokeapi";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public pokemonList:PokeapiResult[] = [];

  constructor(private pokeapiService: PokeapiService) {
  }

  ngOnInit(): void {
    this.getByPage();
  }
  public getByPage() {
    return this.pokeapiService.getByPage().subscribe({
      next: (response: PokeapiResponse) => {
        let responseResults: PokeapiResult[] = [];
        if (response?.results.length > 0) {
          responseResults =  response.results;
        }
        this.pokemonList = [...this.pokemonList, ...responseResults];

        console.log("this.pokemonList");
        console.log(this.pokemonList);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    });
  }

}
