import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsDarkGraphComponent } from './is-dark-graph.component';

describe('IsDarkGraphComponent', () => {
  let component: IsDarkGraphComponent;
  let fixture: ComponentFixture<IsDarkGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsDarkGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsDarkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
