import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StockMarketIndexComponent} from './component/stock-market-index/stock-market-index.component';

const routes: Routes = [
  {
    path: '', component: StockMarketIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
