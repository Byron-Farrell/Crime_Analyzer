import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsDarkBarChartComponent } from './is-dark-chart.component';

describe('IsDarkBarChartComponent', () => {
  let component: IsDarkBarChartComponent;
  let fixture: ComponentFixture<IsDarkBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsDarkBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsDarkBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
