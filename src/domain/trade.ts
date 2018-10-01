import {Stock} from './stock';

export class Trade {

  private mark: number;
  private last: number;
  private closePrice: number;
  private _isOpen: boolean;

  constructor(private stock: Stock, private count: number, private priceToBuy: number) {
    this._isOpen = true;
    this.mark = priceToBuy;
  }

  getStockInfo(): string {
    return `${this.stock.getSymbol()} ${this.stock.getCompany()}`;
  }


  getMark(): number {
    return this.mark;
  }

  isOpen(): boolean {
    return this._isOpen;
  }

  getClosePrice(): number {
    return this._isOpen ? this.closePrice : 0;
  }

  getCount(): number {
    return this.count;
  }

  getStock(): Stock {
    return this.stock;
  }

  getUnreleasedPnL(): number {

    if (!this._isOpen) {
      return 0;
    }
    this.last = this.stock.getPrice();
    let tradePnL = (this.last - this.mark) * this.count;
    return this.getRoundedNumber(tradePnL);
  }

  getReleasedPnL(): number {
    if (!this.closePrice){
      return 0;
    }
    let tradePnL = (this.getClosePrice() - this.mark ) * this.count;
    return this.getRoundedNumber(tradePnL);
  }

  getPnL(): number {
    let tradePnL = (this.closePrice - this.mark) * this.count;
    return this.getRoundedNumber(tradePnL);
  }

  private getRoundedNumber(oldValue: number): number {
    return Math.round(oldValue * 100 + Number.EPSILON) / 100;
  }

  private close(closePrice: number): void {
    this.closePrice = closePrice;
    this._isOpen = false;
  }

  closeTrade() {
    this.close(this.stock.getPrice());
  }
}
