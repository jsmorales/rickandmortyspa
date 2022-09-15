import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RickSearchComponent } from './rick-search.component';
import {MockComponent, MockProvider} from "ng-mocks";
import {RickandmortyapiService} from "../../servicios/rickandmortyapi.service";
import {EMPTY, of} from "rxjs";
import {CharacterCardComponent} from "../character-card/character-card.component";
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

const characterReturn: any = {
  "id": 1,
  "name": "Rick Sanchez Mock",
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

let charArray: any = {
  'results': [
    characterReturn,
    characterReturn
  ]
}

describe('RickSearchComponent', () => {
  let component: RickSearchComponent;
  let fixture: ComponentFixture<RickSearchComponent>;
  let service: RickandmortyapiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // always import this module for http services
      ],
      declarations: [ MockComponent(NavbarComponent), MockComponent(CharacterCardComponent), RickSearchComponent ],
      providers: [MockProvider(RickandmortyapiService, {
        getCharacters: () => of(charArray),
        filterCharactersByName: () => of(charArray),
        handleError: () => EMPTY,
        loading: false
      })],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA // This avoid meaningless errors
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RickSearchComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RickandmortyapiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag with the value RICK AND MORTY', (() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('RICK AND MORTY');
  }));

  it('foundCharsEvent populate characters.', () => {
    charArray = {
      'results': [
        characterReturn,
        characterReturn
      ]
    }
    component.characters = [];
    component.foundCharsEvent(charArray);
    expect(component.characters.length).toEqual(2);
  });

  it('executeSearchApi type init populates characters.', () => {
    component.characters = [];
    component.executeSearchApi('init');
    expect(component.characters.length).toEqual(2);
  });

  it('executeSearchApi type search push object to characters.', () => {
    component.characters = [];
    component.executeSearchApi('init');
    component.executeSearchApi('search');
    expect(component.characters.length).toEqual(4);
  });

  it('executeSearchApi type search onScroll if the service its not loading.', () => {
    charArray = {
      'results': [
        characterReturn,
        characterReturn
      ]
    }
    component.characters = [];
    component.executeSearchApi('init');
    component.pos = 900;
    component.onScroll();
    expect(component.characters.length).toEqual(4);
  });

  it('executeSearchApi type search onScroll if the service its loading not load anything.', () => {
    charArray = {
      'results': [
        characterReturn,
        characterReturn
      ]
    }
    component.characters = [];
    component.executeSearchApi('init');
    component.pos = 900;
    service.loading = true;
    component.onScroll();
    expect(component.characters.length).toEqual(2);
  });

});
