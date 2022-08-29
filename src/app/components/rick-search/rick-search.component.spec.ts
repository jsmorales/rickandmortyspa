import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RickSearchComponent } from './rick-search.component';
import {MockComponent, MockProvider} from "ng-mocks";
import {RickandmortyapiService} from "../../servicios/rickandmortyapi.service";
import {EMPTY} from "rxjs";
import {CharacterCardComponent} from "../character-card/character-card.component";
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {RouterTestingModule} from "@angular/router/testing";

const characterReturn: any = {
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "type": "",
  "gender": "Male",
  "origin": {
    "name": "Earth (C-137)",
    "url": "https://rickandmortyapi.com/api/location/1"
  },
  "location": {
    "name": "Citadel of Ricks",
    "url": "https://rickandmortyapi.com/api/location/3"
  },
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "episode": [
    "https://rickandmortyapi.com/api/episode/1"
  ],
  "url": "https://rickandmortyapi.com/api/character/1",
  "created": "2017-11-04T18:48:46.250Z"
};

describe('RickSearchComponent', () => {
  let component: RickSearchComponent;
  let fixture: ComponentFixture<RickSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockComponent(NavbarComponent), MockComponent(CharacterCardComponent), RickSearchComponent ],
      providers: [MockProvider(RickandmortyapiService, {
        getCharacters: () => EMPTY,
        filterCharactersByName: () => EMPTY,
        handleError: () => EMPTY
      })]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RickSearchComponent);
    component = fixture.componentInstance;
    component.characters.push(characterReturn);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag with the value RICK AND MORTY', (() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('RICK AND MORTY');
  }));

  it('listen the emit of characters.', () => {

    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('app-character-card');
  });

});
