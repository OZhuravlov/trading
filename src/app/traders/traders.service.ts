import { Injectable } from '@angular/core';
import {Trader} from '../../domain/trader';
import {Observable, of} from 'rxjs';
import {Trade} from '../../domain/trade';
import {MarketServiceImpl} from '../market/market.service.impl';
import {Stock} from '../../domain/stock';

@Injectable({
  providedIn: 'root'
})
export class TradersService {

  traders: Trader[];
  stocks: Stock[];

  constructor( private marketService: MarketServiceImpl ) {
    this.traders = this.getMockTraders();
    this.updateStocks();
  }

  getTrader(name: string): Observable<Trader> {
     return of(this.traders.find(t => name === t.getName()));
  }

  getTraders(): Observable<Trader[]> {
    return of([...this.traders]);
  }
  private getMockTraders() {
    let traders: Trader[] = [];

    traders.push(new Trader('Anna', this));
    traders.push(new Trader('Oleg', this));
    return traders;
  }

  add(name: string) {
    this.traders.push(new Trader(name, this));
  }

  closeTrade(trade: Trade) {
    trade.closeTrade();
  }

  buyStock(symbol: string, count: number): Trade {
    let trade: Trade = this.marketService.buyStock(symbol, count);
    return this.marketService.buyStock(symbol, count);
  }


  getFilteredStocks(symbol: string): Stock[]{
    const filterValue = symbol.toUpperCase();
    return this.stocks.filter(stock => stock.getSymbol().toUpperCase().includes(filterValue));
  }


  updateStocks() {
    this.marketService.getStocks().subscribe(stocks => this.stocks = stocks);
  }
}
