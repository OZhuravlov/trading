import {Component, OnInit} from '@angular/core';
import {Stock} from '../../domain/stock';
import {MarketServiceImpl} from './market.service.impl';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  stocks: Stock[];

  constructor(private marketService: MarketServiceImpl) {
  }

  ngOnInit() {
    this.updateStocks();
  }

  updateStocks() {
    this.marketService.updateStocks().subscribe(stocks => this.stocks = stocks);
  }

  add(symbol: string, company: string) {
    this.marketService.addStock(symbol, company);
    this.updateStocks();
  }

  remove(stock: Stock) {
    this.marketService.removeStock(stock);
    this.updateStocks();
  }

}
