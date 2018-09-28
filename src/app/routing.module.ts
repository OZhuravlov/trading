import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {TradersComponent} from './traders/traders.component';
import {MarketComponent} from './market/market.component';
import {TraderDetailsComponent} from './trader-details/trader-details.component';

const routes = [
  { path: '', redirectTo: '/market', pathMatch: 'full'},
  { path: 'traders', component: TradersComponent},
  { path: 'market', component: MarketComponent},
  { path: 'traders/details/Oleg', component: TraderDetailsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
