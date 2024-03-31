import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PokemonData} from "../interfaces/pokemon";
import {PokeapiResponse} from "../interfaces/pokeapi";
import {SpeciesData} from "../interfaces/species";

@Injectable({
  providedIn: 'root'
})

export class PokeapiService {
  private apiServerUrl = "https://pokeapi.co/api/v2"

  constructor(private http: HttpClient) { }

  public getDittoTest(): Observable<any> {
    return this.http.get<PokemonData[]>(`${this.apiServerUrl}/pokemon/ditto`);
  }

  getById(id:string): Observable<PokemonData> {
    return this.http.get<any>(`${this.apiServerUrl}/pokemon/${id}`);
  }

  getByPage(limit:number): Observable<PokeapiResponse> {
    return this.http.get<any>(`${this.apiServerUrl}/pokemon/?limit=${limit}&offset=0`);
  }

  getSpeciesById(id:string): Observable<SpeciesData> {
    return this.http.get<any>(`${this.apiServerUrl}/pokemon-species/${id}`);
  }

}
