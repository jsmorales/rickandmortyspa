import {Component, HostListener, OnInit} from '@angular/core';
import {RickandmortyapiService} from "../../servicios/rickandmortyapi.service";

@Component({
  selector: 'app-rick-search',
  templateUrl: './rick-search.component.html',
  styleUrls: ['./rick-search.component.css']
})
export class RickSearchComponent implements OnInit {

  characters: any = [];
  pos: number = 0;
  max: number = 0;

  executeSearchApi(type: string) {
    this._rickAPI.getCharacters().subscribe((data: any) => {
      if(type === 'init'){
        this.characters=data.results;
      } else if (type === 'search') {
        console.log('executeSearch - search type.')
        if(data.results.length > 0){
          data.results.map( data => {
            this.characters.push(data);
          })
        }
      }
      console.log(this.characters)
    });
  };

  constructor(private _rickAPI: RickandmortyapiService) {

  }

  ngOnInit(): void {
    this.executeSearchApi('init');
  }

  foundCharsEvent(data: any){
    console.log('found char from navbar:')
    console.log(data)
    this.characters = data.results;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.pos = (document.documentElement.scrollTop || document.body.scrollTop) + 800;
    this.max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    console.log('pos: ', this.pos)
    console.log('max: ', this.max)
    if (this.pos > this.max){
      if(this._rickAPI.loading){
        return
      }
      this.executeSearchApi('search');
    }
  }

}
