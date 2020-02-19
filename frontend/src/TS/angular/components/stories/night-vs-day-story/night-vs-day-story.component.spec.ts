import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NightVsDayStoryComponent } from './night-vs-day-story.component';

describe('NightVsDayStoryComponent', () => {
  let component: NightVsDayStoryComponent;
  let fixture: ComponentFixture<NightVsDayStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NightVsDayStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NightVsDayStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
