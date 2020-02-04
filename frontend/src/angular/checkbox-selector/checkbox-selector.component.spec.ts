import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxSelectorComponent } from './checkbox-selector.component';

describe('CheckboxSelectorComponent', () => {
  let component: CheckboxSelectorComponent;
  let fixture: ComponentFixture<CheckboxSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
