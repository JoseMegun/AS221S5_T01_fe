import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModerationListComponent } from './moderation-list.component';
import { ModerationService } from 'src/app/services/moderation.service';

describe('ModerationListComponent', () => {
  let component: ModerationListComponent;
  let fixture: ComponentFixture<ModerationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ModerationListComponent],
      providers: [ModerationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

