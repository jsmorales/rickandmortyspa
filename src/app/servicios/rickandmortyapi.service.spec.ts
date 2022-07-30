import { TestBed } from '@angular/core/testing';

import { RickandmortyapiService } from './rickandmortyapi.service';

describe('RickandmortyapiService', () => {
  let service: RickandmortyapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickandmortyapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
