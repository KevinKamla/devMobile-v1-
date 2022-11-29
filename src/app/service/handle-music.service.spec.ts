import { TestBed } from '@angular/core/testing';

import { HandleMusicService } from './handle-music.service';

describe('HandleMusicService', () => {
  let service: HandleMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
