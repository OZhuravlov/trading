import {Stock} from '../../domain/stock';
import {Observable, of} from 'rxjs';
import {MarketService} from './market.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Trade} from '../../domain/trade';

@Injectable({
  providedIn: 'root'
})
export class MarketServiceImpl implements MarketService {

  private readonly stocks: Stock[];
  private counter = 0;

  constructor(private httpClient: HttpClient) {
    this.stocks = [];

    this.getStockData().subscribe(data => {
      for (let md of data) {
        this.stocks.push(new Stock(md.symbol, md.company, this));
      }
    },
      error => {
      console.log('Cannot get market data from the server!');
      }
    );
  }

  getPrice(symbol: string) {
    return Math.round(Math.random() * 1000 * symbol.length* 100 + Number.EPSILON) / 100;
  }

  getUpdatedPrice(currentPrice: number) {
    let multiplier = 1;
    this.counter++;
    if (this.counter % 2 === 1) {
      multiplier = -1;
    }
    return Math.round((currentPrice + (Math.random() * multiplier)) * 100 + Number.EPSILON) / 100;
  }

  getStocks(): Observable<Stock[]> {
    return of(this.stocks);
  }

  addStock(symbol: string, company: string) {
    this.stocks.push(new Stock(symbol, company, this));
  }

  removeStock(stock: Stock) {
    const index = this.stocks.indexOf(stock);
    if (index !== -1 ) {
       this.stocks.splice(index, 1);
    }
  }

  buyStock(symbol: string, count: number): Trade {

    let stock: Stock = this.getStock(symbol);
    console.log(this.stocks);
    if (stock) {
      return new Trade(stock, count, stock.getPrice());
    }

    return null;
  }

  private getStock(symbol: string): Stock {
    console.log(symbol);
    return this.stocks.find(stock => stock.getSymbol() === symbol);
  }

  private getStockData(): Observable<MarketData[]> {
    return this.httpClient.get<MarketData[]>('assets/market-data.json');
  }
}

interface MarketData {
  symbol: string;
  company: string;
}
