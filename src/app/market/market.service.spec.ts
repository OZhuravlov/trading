import { TestBed } from '@angular/core/testing';
import { MarketService } from './market.service';
import {MarketServiceImpl} from './market.service.impl';

describe('MarketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarketService = TestBed.get(MarketServiceImpl);
    expect(service).toBeTruthy();
  });
});
