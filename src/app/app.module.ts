import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MarketComponent } from './market/market.component';
import { TradersComponent } from './traders/traders.component';
import { RoutingModule } from './routing.module';
import { TradersService } from './traders/traders.service';
import { HttpClientModule } from '@angular/common/http';
import { TraderDetailsComponent } from './trader-details/trader-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StocksComponent } from './stocks/stocks.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    TradersComponent,
    TraderDetailsComponent,
    StocksComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatAutocompleteModule
  ],
  providers: [ TradersService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
