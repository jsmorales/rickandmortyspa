import {NavbarComponent} from "./navbar.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RickandmortyapiService} from "../../../servicios/rickandmortyapi.service";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {Observable} from "rxjs";

describe('Navbar component', () => {
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
        RickandmortyapiService // Service provided in the constructor
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA // This avoid meaningless errors
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RickandmortyapiService);
    fixture.detectChanges() // executes the onInit() event of the component
  })

  it('Should create the component.', () => {
    expect(component).toBeTruthy()
  })

  it('executeSearch filterCharactersByName if the length of search value is greater or equal to 3.', () => {
    const characterName = 'Rick';
    const spyFilterCharactersByName = spyOn(service, 'filterCharactersByName').and.returnValue(new Observable());
    component.executeSearch(characterName);
    expect(spyFilterCharactersByName).toHaveBeenCalled();
  })

  it('executeSearch getCharacters if the length of search value is lower to 3.', () => {
    const characterName = 'Ri';
    const spyGetCharacters = spyOn(service, 'getCharacters').and.returnValue(new Observable());
    component.executeSearch(characterName);
    expect(spyGetCharacters).not.toHaveBeenCalled();
  })

});
