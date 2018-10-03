import {Stock} from '../../domain/stock';
import {Observable} from 'rxjs';

export interface MarketService {
  getPrice(symbol: string): number;
  getUpdatedPrice(currentPrice: number): number;
  updateStocks(): Observable<Stock[]>;
  addStock(symbol: string, company: string);
  removeStock(stock: Stock);
  buyStock(symbol: string, count: number);
  getStocks(): Stock[];
}
