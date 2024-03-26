import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PokeapiService {
  private apiServerUrl = "https://pokeapi.co/api/v2"

  constructor(private http: HttpClient) { }

  public getDittoTest(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/pokemon/ditto`);
  }

}
