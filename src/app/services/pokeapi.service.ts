import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PokemonData} from "../components/pokemon-data/pokemon-data";
import {PokeapiResponse} from "../interfaces/pokeapi";

@Injectable({
  providedIn: 'root'
})

export class PokeapiService {
  private apiServerUrl = "https://pokeapi.co/api/v2"

  constructor(private http: HttpClient) { }

  public getDittoTest(): Observable<any> {
    return this.http.get<PokemonData[]>(`${this.apiServerUrl}/pokemon/ditto`);
  }


  getById() {


  }

  getByPage(): Observable<PokeapiResponse> {
    return this.http.get<any>(`${this.apiServerUrl}/pokemon/?limit=10&offset=20 `);

  }


}
