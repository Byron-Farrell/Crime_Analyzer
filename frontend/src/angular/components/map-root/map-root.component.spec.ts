import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRootComponent } from './map-root.component';

describe('MapRootComponent', () => {
  let component: MapRootComponent;
  let fixture: ComponentFixture<MapRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
