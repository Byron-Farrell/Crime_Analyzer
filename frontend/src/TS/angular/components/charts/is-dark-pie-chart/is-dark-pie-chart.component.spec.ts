import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsDarkPieChartComponent } from './is-dark-pie-chart.component';

describe('IsDarkPieChartComponent', () => {
  let component: IsDarkPieChartComponent;
  let fixture: ComponentFixture<IsDarkPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsDarkPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsDarkPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
