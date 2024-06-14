import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModerationFormComponent } from './moderation-form.component';
import { ModerationService } from 'src/app/services/moderation.service';

describe('ModerationFormComponent', () => {
  let component: ModerationFormComponent;
  let fixture: ComponentFixture<ModerationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ModerationFormComponent],
      providers: [ModerationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
