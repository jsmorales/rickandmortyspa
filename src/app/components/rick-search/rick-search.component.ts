import { Component, OnInit } from '@angular/core';
import {RickandmortyapiService} from "../../servicios/rickandmortyapi.service";

@Component({
  selector: 'app-rick-search',
  templateUrl: './rick-search.component.html',
  styleUrls: ['./rick-search.component.css']
})
export class RickSearchComponent implements OnInit {

  characters: any = [];

  constructor(private _rickAPI: RickandmortyapiService) {
    this._rickAPI.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
      console.log(this.characters)
    });
  }

  ngOnInit(): void {

  }

}
