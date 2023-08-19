import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorGridComponent } from './editor-grid.component';

describe('EditorGridComponent', () => {
  let component: EditorGridComponent;
  let fixture: ComponentFixture<EditorGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorGridComponent]
    });
    fixture = TestBed.createComponent(EditorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
