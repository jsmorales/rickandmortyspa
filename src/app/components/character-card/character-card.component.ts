import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CharacterCardComponent implements OnInit {

  @Input() character: any = {};
  @Input() index: number;

  @Output() selectedCharacter: EventEmitter<number>;

  constructor(private router: Router) {
    this.selectedCharacter = new EventEmitter();
  }

  ngOnInit() {
    console.log('log from character card.')
    console.log(this.character)
  }

  /*verHeroe() {
    // console.log(  this.index );
    this.router.navigate( ['/heroe', this.index] );
    // this.heroeSeleccionado.emit( this.index );
  }*/

}
