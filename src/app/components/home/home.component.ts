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

        console.log("this.pokemonList");
        console.log(this.pokemonList);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    });
  }

  public cardClicked(eventId:string) {
    this.pokeapiService.getById(eventId).subscribe({
      next: (response: PokemonData) => {
        let shape: string = "";
        this.getShape(eventId).subscribe({
          next: (response) => {
            shape = response;
            console.log(response)
          }
        });
        console.log(shape)
        let pokemonHeight:any = response?.height;
        let calcImgHeight:number = 30 + pokemonHeight * (shape !== "squiggle" ? 4: 1.6);
        calcImgHeight > 100 ? response.imgHeight = 100 : response.imgHeight = calcImgHeight;
        console.log(calcImgHeight)
        this.selectedPokemonData = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    })
  }

  private getShape(eventId:string):Observable<string> {
    let subject = new Subject<string>();
    this.pokeapiService.getSpeciesById(eventId).subscribe({
      next: (response: SpeciesData) => {
        console.log("GET SHAPE RESPONSE")
        console.log(response.shape?.name)
        subject.next(response.shape?.name);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    })
    console.log("SUBJECT")
    console.log(subject.asObservable().subscribe((res) => res));
    return subject.asObservable();
  }

}
