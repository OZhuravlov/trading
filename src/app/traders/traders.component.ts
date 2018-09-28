import { Component, OnInit } from '@angular/core';
import {Trader} from '../../domain/trader';
import {TradersService} from './traders.service';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.css']
})
export class TradersComponent implements OnInit {

  traders: Trader[];
  constructor(private traderService: TradersService) { }

  ngOnInit() {
    this.updateTraders();
  }

  private updateTraders() {
    this.traderService.getTraders().subscribe(traders => this.traders = traders);
  }

  add(name: string) {
    this.traderService.add(name);
    this.updateTraders();
  }
}
