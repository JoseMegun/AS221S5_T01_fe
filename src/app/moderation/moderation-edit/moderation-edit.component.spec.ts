import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModerationEditComponent } from './moderation-edit.component';
import { ModerationService } from 'src/app/services/moderation.service';

describe('ModerationEditComponent', () => {
  let component: ModerationEditComponent;
  let fixture: ComponentFixture<ModerationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ModerationEditComponent],
      providers: [ModerationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
