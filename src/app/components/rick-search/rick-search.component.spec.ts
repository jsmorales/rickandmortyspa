import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RickSearchComponent } from './rick-search.component';

describe('RickSearchComponent', () => {
  let component: RickSearchComponent;
  let fixture: ComponentFixture<RickSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RickSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
