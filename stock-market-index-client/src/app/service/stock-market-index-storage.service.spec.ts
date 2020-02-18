import { TestBed } from '@angular/core/testing';

import { StockMarketIndexStorageService } from './stock-market-index-storage.service';

describe('StockMarketIndexStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockMarketIndexStorageService = TestBed.get(StockMarketIndexStorageService);
    expect(service).toBeTruthy();
  });
});
