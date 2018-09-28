import { Component, OnInit } from '@angular/core';
import {TradersService} from '../traders/traders.service';
import {Trader} from '../../domain/trader';
import {Trade} from '../../domain/trade';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  private trader: Trader;

  constructor(private tradersService: TradersService) {
  }

  ngOnInit() {
    this.tradersService.getTrader('Oleg').subscribe(trader => this.trader = trader);
  }

  closeTrade(trade: Trade) {
    this.tradersService.closeTrade(trade);
}
}
