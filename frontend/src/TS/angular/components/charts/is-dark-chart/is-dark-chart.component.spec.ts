import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsDarkChartComponent } from './is-dark-chart.component';

describe('IsDarkChartComponent', () => {
  let component: IsDarkChartComponent;
  let fixture: ComponentFixture<IsDarkChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsDarkChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsDarkChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
