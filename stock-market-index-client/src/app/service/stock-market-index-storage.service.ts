import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { StockMarketIndexModel } from '../model/stock-market-index.model';

@Injectable({
  providedIn: 'root'
})
export class StockMarketIndexStorageService {

  eventSource: any = window['EventSource'];

  constructor(private ngZone: NgZone) {}

  observeStockMarketIndexes(sseUrl: string): Observable<StockMarketIndexModel> {
    return new Observable<StockMarketIndexModel>(obs => {
      const eventSource = new this.eventSource(sseUrl);
      eventSource.onmessage = event => {
        const data = JSON.parse(event.data);
        this.ngZone.run(() => obs.next(data));

      };
      return () => eventSource.close();
    });
  }
}
