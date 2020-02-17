import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSelectorComponent } from './slider-selector.component';

describe('SliderSelectorComponent', () => {
  let component: SliderSelectorComponent;
  let fixture: ComponentFixture<SliderSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
