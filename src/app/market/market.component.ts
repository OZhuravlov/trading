import {Component, OnInit} from '@angular/core';
import {Stock} from '../../domain/stock';
import {MarketServiceImpl} from './market.service.impl';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  myControl = new FormControl();
  stocks: Stock[];
  filteredStocks: Observable<Stock[]>;

  constructor(private marketService: MarketServiceImpl) {
  }

  ngOnInit() {
    this.updateStocks();
    this.filteredStocks = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(stock => this._filter(stock))
      )
  }

  private _filter(stock: string): Stock[]{
    const filterValue = stock.toUpperCase();
    return this.stocks.filter(stock => stock.getSymbol().toUpperCase().includes(filterValue));
  }

  updateStocks() {
    this.marketService.getStocks().subscribe(stocks => this.stocks = stocks);
  }

  add(symbol: string, company: string) {
    this.marketService.addStock(symbol, company);
    this.updateStocks();
  }

  remove(stock: Stock) {
    this.marketService.removeStock(stock);
    this.updateStocks();
  }

  buyStock(symbol: string, count: number) {
    this.marketService.buyStock(symbol, count)
  }
}
