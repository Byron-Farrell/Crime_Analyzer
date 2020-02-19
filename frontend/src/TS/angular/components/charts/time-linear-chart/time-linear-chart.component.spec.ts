import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLinearChartComponent } from './time-linear-chart.component';

describe('TimeLinearChartComponent', () => {
  let component: TimeLinearChartComponent;
  let fixture: ComponentFixture<TimeLinearChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLinearChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLinearChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
