import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationListComponent } from './moderation-list.component';

describe('ModerationListComponent', () => {
  let component: ModerationListComponent;
  let fixture: ComponentFixture<ModerationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModerationListComponent]
    });
    fixture = TestBed.createComponent(ModerationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
