import {ComponentFixture, TestBed} from '@angular/core/testing';

import { RickSearchComponent } from './rick-search.component';
import {HttpClientModule} from "@angular/common/http";

describe('RickSearchComponent', () => {
  let component: RickSearchComponent;
  let fixture: ComponentFixture<RickSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
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

  it('should render title in a h1 tag with the value RICK AND MORTY', (() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('RICK AND MORTY');
  }));

});
