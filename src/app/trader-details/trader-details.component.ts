import { Component, OnInit } from '@angular/core';
import {TradersService} from '../traders/traders.service';
import {Trader} from '../../domain/trader';
import {Trade} from '../../domain/trade';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Stock} from '../../domain/stock';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  myControl = new FormControl();
  filteredStocks: Observable<Stock[]>;
  trader: Trader;

  constructor(private tradersService: TradersService) {
  }

  ngOnInit() {
    this.tradersService.getTrader('Oleg').subscribe(trader => this.trader = trader);
    this.filteredStocks = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(symbol => this.tradersService.getFilteredStocks(symbol))
      )
  }

  buyStock(symbol: string, count: number) {
    this.trader.addToPortfolio(this.tradersService.buyStock(symbol, count));
  }

  closeTrade(trade: Trade) {
    this.tradersService.closeTrade(trade);
}
}
