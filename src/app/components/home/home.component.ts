import {Component, OnInit} from '@angular/core';
import {PokeapiService} from "../../services/pokeapi.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {PokeapiResponse, PokeapiResult} from "../../interfaces/pokeapi";
import {PokemonDisplayComponent} from "../pokemon-display/pokemon-display.component";
import {PokemonCardComponent} from "../pokemon-card/pokemon-card.component";
import {PokemonData} from "../../interfaces/pokemon";
import {SpeciesData} from "../../interfaces/species";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf, PokemonDisplayComponent, PokemonCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public pokemonList:PokeapiResult[] = [];
  public selectedPokemonData?:PokemonData;
  public selectedPokemonShape?:string;

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.getByPage();
  }
  public getByPage(limit:number = 151) {
    return this.pokeapiService.getByPage(limit).subscribe({
      next: (response: PokeapiResponse) => {
        let responseResults: PokeapiResult[] = [];
        if (response?.results.length > 0) {
          responseResults =  response.results;
        }
        this.pokemonList = [...this.pokemonList, ...responseResults];
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    });
  }

  public cardClicked(eventId:string) {
    this.pokeapiService.getSpeciesById(eventId).subscribe({
      next: (response: SpeciesData) => {
        this.selectedPokemonShape = response.shape?.name;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    });

    this.pokeapiService.getById(eventId).subscribe({
      next: (response: PokemonData) => {
        this.selectedPokemonData = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    })
  }
}
