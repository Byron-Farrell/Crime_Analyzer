import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphFilterOptionsComponent } from './graph-filter-options.component';

describe('GraphFilterOptionsComponent', () => {
  let component: GraphFilterOptionsComponent;
  let fixture: ComponentFixture<GraphFilterOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphFilterOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
