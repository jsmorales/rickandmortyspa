import {Component, HostListener, OnInit} from '@angular/core';
import {RickandmortyapiService} from "../../servicios/rickandmortyapi.service";

@Component({
  selector: 'app-rick-search',
  templateUrl: './rick-search.component.html',
  styleUrls: ['./rick-search.component.css']
})
export class RickSearchComponent implements OnInit {

  characters: any = [];

  executeSearchApi(type: string) {
    this._rickAPI.getCharacters().subscribe((data: any) => {
      console.log(data);
      if(type === 'init'){
        this.characters=data.results;
      } else if (type === 'search') {
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
    this.executeSearchApi('init');
  }

  ngOnInit(): void {

  }

  foundCharsEvent(data: any){
    console.log('found char from navbar:')
    console.log(data)
    this.characters = data.results;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 800;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if (pos > max){
      if(this._rickAPI.loading){
        return
      }
      this.executeSearchApi('search');
    }
  }

}
