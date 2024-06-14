import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModerationService } from './moderation.service';

describe('ModerationService', () => {
  let service: ModerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModerationService]
    });
    service = TestBed.inject(ModerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
