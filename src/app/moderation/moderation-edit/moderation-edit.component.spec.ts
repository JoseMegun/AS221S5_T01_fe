import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationEditComponent } from './moderation-edit.component';

describe('ModerationEditComponent', () => {
  let component: ModerationEditComponent;
  let fixture: ComponentFixture<ModerationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModerationEditComponent]
    });
    fixture = TestBed.createComponent(ModerationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
