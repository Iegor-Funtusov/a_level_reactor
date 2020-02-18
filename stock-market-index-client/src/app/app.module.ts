import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveIndexClientModule } from './core/reactive-index-client.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StockMarketIndexComponent } from './component/stock-market-index/stock-market-index.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    StockMarketIndexComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveIndexClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
