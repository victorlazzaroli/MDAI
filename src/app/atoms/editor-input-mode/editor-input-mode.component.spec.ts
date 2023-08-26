import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorInputModeComponent } from './editor-input-mode.component';

describe('EditorInputModeComponent', () => {
  let component: EditorInputModeComponent;
  let fixture: ComponentFixture<EditorInputModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorInputModeComponent]
    });
    fixture = TestBed.createComponent(EditorInputModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
