import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTitleComponent } from './tab-title.component';

describe('TabTitleComponent', () => {
  let component: TabTitleComponent;
  let fixture: ComponentFixture<TabTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabTitleComponent]
    });
    fixture = TestBed.createComponent(TabTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
