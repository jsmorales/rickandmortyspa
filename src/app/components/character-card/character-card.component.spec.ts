import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ CharacterCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    component.index = 1;
    component.character = {
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
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an h4 element with a Rick Sanchez value', (() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    console.log('h4 content:')
    console.log(compiled.querySelector('h4').textContent)
    expect(compiled.querySelector('h4').textContent).toEqual('Rick Sanchez');
  }));

  it('should render an p element with a Human value', (() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    console.log('p content:')
    console.log(compiled.querySelector('p').textContent)
    expect(compiled.querySelector('p').textContent).toEqual(' Human ');
  }));

  it('should render an small element with a Male value', (() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    console.log('small content:')
    console.log(compiled.querySelector('small').textContent)
    expect(compiled.querySelector('small').textContent).toEqual('Male');
  }));

  it('should render an image with a valid source', (() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img').src).toEqual(component.character.image);
  }));

});
