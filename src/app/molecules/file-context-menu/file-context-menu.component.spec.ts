import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileContextMenuComponent } from './file-context-menu.component';

describe('FileContextMenuComponent', () => {
  let component: FileContextMenuComponent;
  let fixture: ComponentFixture<FileContextMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileContextMenuComponent]
    });
    fixture = TestBed.createComponent(FileContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
