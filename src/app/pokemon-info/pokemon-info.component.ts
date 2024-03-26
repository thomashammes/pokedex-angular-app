import { Component } from '@angular/core'
import {PokeapiService} from "../service/pokeapi.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-pokemon-info',
  standalone: true,
  template: '<h1> Pokemon Info </h1>'
})

export class PokemonInfoComponent {

  constructor(private pokeApiService: PokeapiService) { }

  ngOnInit() {
    this.getDittoTest();
  }

  public getDittoTest(): void {
    this.pokeApiService.getDittoTest().subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.error(error);
      }
    })
  }

}
