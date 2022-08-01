import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { RickandmortyapiService } from './rickandmortyapi.service';
import {HttpClientModule} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

describe('RickandmortyapiService', () => {
  let service: RickandmortyapiService;
  let rickServiceStub = {
    getCharacters() {
      const data = {
          "info": {
            "count": 826,
            "pages": 42,
            "next": "https://rickandmortyapi.com/api/character?page=2",
            "prev": null
          },
          "results": [
            {
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
          ]
        }
      ;
      return of(data);
    },
    filterCharactersByName(name: string) {
      const data = {
          "info": {
            "count": 826,
            "pages": 42,
            "next": "https://rickandmortyapi.com/api/character?page=2",
            "prev": null
          },
          "results": [
            {
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
          ]
        };
      const error = {
        error: {
          error: 'Nothing Here.'
        },
        status: 404
      }
      return of(name.length === 0 ? error : data);
    },
    handleError(error){
      return of(throwError(error));
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{provide: RickandmortyapiService, useValue: rickServiceStub}]
    });
    service = TestBed.inject(RickandmortyapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get some data from the getCharacters method.', () => {
    service.getCharacters().subscribe(value => {
      expect(value).toBeTruthy()
    })
  });

  it('should response and object with info and results', fakeAsync(() => {
    service.getCharacters().subscribe(value => {
      console.log('response data value:')
      console.log(value)
      expect(value.info).toBeTruthy()
      expect(value.results).toBeTruthy()
    })
  }));

  it('should response an object searching by Rick string', fakeAsync(() => {
    service.filterCharactersByName('Rick').subscribe(value => {
      console.log('response data value search:')
      console.log(value)
      expect(value.info).toBeTruthy();
      expect(value.results[0].name).toEqual('Rick Sanchez');
    })
  }));

  it('should response an error object searching by empty string', fakeAsync(() => {
    service.filterCharactersByName('').subscribe(value => {
      console.log('response data value search:')
      console.log(value)
      expect(value.error).toBeTruthy();
      expect(value.status).toBeTruthy();
      expect(value.error.error).toEqual('Nothing Here.');
    })
  }));

  it('handleError should return an Observable', fakeAsync(() => {
    const error = {
      error: {
        error: 'Nothing Here.'
      },
      status: 404
    };
    service.handleError(error).subscribe(value => {
      console.log('response data value error:');
      console.log(value)
      expect(value).toBeInstanceOf(Observable);
    });
  }));

});
