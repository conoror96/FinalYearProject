import { TestBed } from '@angular/core/testing';

import { NfcServiceService } from './nfc-service.service';

describe('NfcServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NfcServiceService = TestBed.get(NfcServiceService);
    expect(service).toBeTruthy();
  });
});
