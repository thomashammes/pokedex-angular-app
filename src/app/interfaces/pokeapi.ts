export interface PokeapiResponse {
  count: number,
  next: string,
  previous: string,
  results: PokeapiResult[]
}

export interface PokeapiResult {
  name: string,
  url: string
}
