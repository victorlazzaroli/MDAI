import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdViewerComponent } from './md-viewer.component';

describe('MdViewerComponent', () => {
  let component: MdViewerComponent;
  let fixture: ComponentFixture<MdViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdViewerComponent]
    });
    fixture = TestBed.createComponent(MdViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
