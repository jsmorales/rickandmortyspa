import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RickandmortyapiService} from "../../../servicios/rickandmortyapi.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  @Output() foundCharacters:EventEmitter<any> = new EventEmitter<any>();

  constructor( private _rickApiService:RickandmortyapiService ) { }

  ngOnInit() {
  }

  executeSearch( characterNameValue:string ){
    this._rickApiService.loading = false;
    if(characterNameValue.length >= 3) {
      this._rickApiService.filterCharactersByName(characterNameValue).subscribe((data: any) => {
        this.foundCharacters.emit(data);
      });
    } else if (characterNameValue.length === 0){
      this._rickApiService.getCharacters(true).subscribe((data: any) => {
        this.foundCharacters.emit(data);
      });
    }
  }

}
