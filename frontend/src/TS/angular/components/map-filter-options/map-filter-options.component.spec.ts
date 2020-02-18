import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFilterOptionsComponent } from './map-filter-options.component';

describe('MapFilterOptionsComponent', () => {
  let component: MapFilterOptionsComponent;
  let fixture: ComponentFixture<MapFilterOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapFilterOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
