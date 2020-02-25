import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMappingRootComponent } from './upload-mapping-root.component';

describe('UploadMappingRootComponent', () => {
  let component: UploadMappingRootComponent;
  let fixture: ComponentFixture<UploadMappingRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMappingRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMappingRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
