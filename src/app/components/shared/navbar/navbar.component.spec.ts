import {NavbarComponent} from "./navbar.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RickandmortyapiService} from "../../../servicios/rickandmortyapi.service";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {EMPTY, of} from "rxjs";

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

fdescribe('Navbar component', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: RickandmortyapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule // always import this module for http services
      ],
      declarations: [
        NavbarComponent
      ],
      providers: [
        {
          provide: RickandmortyapiService,
          useValue: {
            getCharacters: () => of(charArray),
            filterCharactersByName: () => of(charArray),
            handleError: () => EMPTY,
            loading: false
          }
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA // This avoid meaningless errors
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RickandmortyapiService);
    fixture.detectChanges() // executes the onInit() event of the component
  });

  it('Should create the component.', () => {
    expect(component).toBeTruthy()
  });

  it('executeSearch filterCharactersByName if the length of search value is greater or equal to 3.', () => {
    const characterName = 'Rick';
    const spyFilterCharactersByName = spyOn(service, 'filterCharactersByName').and.returnValue(of(charArray)); // of(null) = new Observable()
    component.foundCharacters.subscribe((value) => {
      console.log('foundCharacters: emit value');
      console.log(value);
      expect(value).toBeTruthy();
      expect(value.results.length).toEqual(2);
    });
    component.executeSearch(characterName);
    expect(spyFilterCharactersByName).toHaveBeenCalled();
  });

  it('executeSearch getCharacters if the length of search value is lower to 3.', () => {
    const characterName = 'Ri';
    const spyGetCharacters = spyOn(service, 'getCharacters').and.returnValue(of(charArray));
    component.foundCharacters.subscribe((value) => {
      console.log('foundCharacters: emit value');
      console.log(value);
      expect(value).toBeTruthy();
      expect(value.results.length).toEqual(2);
    });
    component.executeSearch(characterName);
    expect(spyGetCharacters).not.toHaveBeenCalled();
  });

});
