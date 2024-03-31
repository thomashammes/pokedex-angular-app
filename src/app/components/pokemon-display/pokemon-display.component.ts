import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PokemonData} from "../../interfaces/pokemon";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";

@Component({
  selector: 'app-pokemon-display',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgOptimizedImage
  ],
  templateUrl: './pokemon-display.component.html',
  styleUrl: './pokemon-display.component.scss'
})
export class PokemonDisplayComponent implements OnChanges {

  @Input() pokemon?: PokemonData;
  @Input() shape?: string;
  public htmlImgContent?: string = "";
  private ignoreSquiggleIds: number[] = [11, 14];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && this.pokemon) {
      let pokemonHeight:any = this.pokemon?.height;
      let calcImgHeight:number = 30 + pokemonHeight *
        (this.shape !== "squiggle" || this.ignoreSquiggleIds.includes(this?.pokemon?.id)? 4 : 1.6);
      calcImgHeight > 100 ? calcImgHeight = 100 : calcImgHeight;
      const percentileHeight:string = `${calcImgHeight}%`
      this.htmlImgContent = `<img alt=${this.pokemon?.name}" height=${percentileHeight}
                              src=${this.pokemon?.sprites?.other?.home?.front_default}>`
    }
  }
}
