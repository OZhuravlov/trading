import {Trade} from './trade';
import {TradersService} from '../app/traders/traders.service';

export class Trader {

  private portfolio: Trade[];

  constructor(private name: string, private traderService: TradersService) {
    this.portfolio = [];
    this.addToPortfolio(this.traderService.buyStock('BA', 10));
    this.addToPortfolio(this.traderService.buyStock('CAT', 22));
    this.addToPortfolio(this.traderService.buyStock('KO', 45));
  }

  getPortfolio(){
    return this.portfolio;
  }

  addToPortfolio(trade: Trade){
    this.portfolio.push(trade);
  }

  getOpenTrades(): Trade[] {
    // console.log(this.portfolio.filter(trade => trade.isOpen()).length);
    return this.portfolio.filter(trade => trade.isOpen());
  }

  getClosedTrades(): Trade[] {
    return this.portfolio.filter(trade => !trade.isOpen());
  }

  getName(): string {
    return this.name;
  }

  getReleasedPnL(): number {
     let pnl: number = this.portfolio.reduce((a, b) => a + b.getReleasedPnL(), 0);
     return pnl;
  }

  getUnreleasedPnL(): number {
     let pnl: number = this.portfolio.reduce((a, b) => a + b.getUnreleasedPnL(), 0);
     return pnl;
  }

  getTotalPnL(): number {
    return this.getReleasedPnL() + this.getUnreleasedPnL();
  }

}
