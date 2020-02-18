import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockMarketIndexStorageService } from './stock-market-index-storage.service';
import { StockMarketIndexModel } from '../model/stock-market-index.model';
import { StockMarketIndexViewModel } from '../model/stock-market-index-view.model';
import { StockMarketIndexChartModel } from '../model/stock-market-index-chart.model';
import { StockMarketIndexChartDataModel } from '../model/stock-market-index-chart-data.model';

export class StockMarketIndexDataSource implements DataSource<StockMarketIndexViewModel> {

  private stockMarketIndexSubject = new BehaviorSubject<StockMarketIndexViewModel[]>([]);
  private stockMarketIndexChartDataSubject = new BehaviorSubject<StockMarketIndexChartDataModel>(new StockMarketIndexChartDataModel());
  public stockMarketIndexData: StockMarketIndexViewModel[] = [];
  public stockMarketIndexChartDataModel = new StockMarketIndexChartDataModel();

  constructor(private storageService: StockMarketIndexStorageService) { }

  connect(collectionViewer: CollectionViewer): Observable<StockMarketIndexViewModel[] | ReadonlyArray<StockMarketIndexViewModel>> {
    return this.stockMarketIndexSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.stockMarketIndexSubject.complete();
  }

  loadStockMarketIndexChartData(): Observable<StockMarketIndexChartDataModel> {
    return this.stockMarketIndexChartDataSubject.asObservable();
  }

  loadData() {
    this.storageService.observeStockMarketIndexes('http://localhost:8080/indexes').subscribe(data => {
      const currentData = new StockMarketIndexViewModel();
      currentData.indexData = data;
      currentData.chartData = this.initChartModel(data);
      this.clearIndexData();
      this.stockMarketIndexData.push(currentData);
      this.stockMarketIndexSubject.next(this.stockMarketIndexData);
      this.stockMarketIndexChartDataSubject.next(this.stockMarketIndexChartDataModel);
    });
  }

  private initChartModel(element: StockMarketIndexModel): StockMarketIndexChartModel {
    let chartModel = new StockMarketIndexChartModel();
    switch (element.stockMarketIndexName) {
      case 'RUSSELL_INVESTMENT_GROUP' : {
        chartModel = this.generateAmericanStockExchangeData(chartModel);
        chartModel = this.generateNasdaqData(chartModel);
        chartModel = this.generateNewYorkStockExchangeData(chartModel);
        chartModel.RUSSELL_INVESTMENT_GROUP = element.stockMarketIndexCurrentValue;
        this.stockMarketIndexChartDataModel.RUSSELL_INVESTMENT_GROUP_DATA.push(element.stockMarketIndexCurrentValue);
        return chartModel;
      }
      case 'AMERICAN_STOCK_EXCHANGE' : {
        chartModel = this.generateRussellInvestmentGroupData(chartModel);
        chartModel = this.generateNasdaqData(chartModel);
        chartModel = this.generateNewYorkStockExchangeData(chartModel);
        chartModel.AMERICAN_STOCK_EXCHANGE = element.stockMarketIndexCurrentValue;
        this.stockMarketIndexChartDataModel.AMERICAN_STOCK_EXCHANGE_DATA.push(element.stockMarketIndexCurrentValue);
        return chartModel;
      }
      case 'NASDAQ' : {
        chartModel = this.generateRussellInvestmentGroupData(chartModel);
        chartModel = this.generateAmericanStockExchangeData(chartModel);
        chartModel = this.generateNewYorkStockExchangeData(chartModel);
        chartModel.NASDAQ = element.stockMarketIndexCurrentValue;
        this.stockMarketIndexChartDataModel.NASDAQ_DATA.push(element.stockMarketIndexCurrentValue);
        return chartModel;
      }
      case 'NEW_YORK_STOCK_EXCHANGE' : {
        chartModel = this.generateRussellInvestmentGroupData(chartModel);
        chartModel = this.generateAmericanStockExchangeData(chartModel);
        chartModel = this.generateNasdaqData(chartModel);
        chartModel.NEW_YORK_STOCK_EXCHANGE = element.stockMarketIndexCurrentValue;
        this.stockMarketIndexChartDataModel.NEW_YORK_STOCK_EXCHANGE_DATA.push(element.stockMarketIndexCurrentValue);
        return chartModel;
      }
    }
  }

  private generateAmericanStockExchangeData(chartModel: StockMarketIndexChartModel): StockMarketIndexChartModel {
    if (this.stockMarketIndexChartDataModel.AMERICAN_STOCK_EXCHANGE_DATA.length === 0) {
      chartModel.AMERICAN_STOCK_EXCHANGE = 0.00;
    } else {
      chartModel.AMERICAN_STOCK_EXCHANGE = this.stockMarketIndexChartDataModel.AMERICAN_STOCK_EXCHANGE_DATA[this.stockMarketIndexChartDataModel.AMERICAN_STOCK_EXCHANGE_DATA.length - 1];
    }
    return chartModel;
  }

  private generateNasdaqData(chartModel: StockMarketIndexChartModel): StockMarketIndexChartModel {
    if (this.stockMarketIndexChartDataModel.NASDAQ_DATA.length === 0) {
      chartModel.NASDAQ = 0.00;
    } else {
      chartModel.NASDAQ = this.stockMarketIndexChartDataModel.NASDAQ_DATA[this.stockMarketIndexChartDataModel.NASDAQ_DATA.length - 1];
    }
    return chartModel;
  }

  private generateRussellInvestmentGroupData(chartModel: StockMarketIndexChartModel): StockMarketIndexChartModel {
    if (this.stockMarketIndexChartDataModel.RUSSELL_INVESTMENT_GROUP_DATA.length === 0) {
      chartModel.RUSSELL_INVESTMENT_GROUP = 0.00;
    } else {
      chartModel.RUSSELL_INVESTMENT_GROUP = this.stockMarketIndexChartDataModel.RUSSELL_INVESTMENT_GROUP_DATA[this.stockMarketIndexChartDataModel.RUSSELL_INVESTMENT_GROUP_DATA.length - 1];
    }
    return chartModel;
  }

  private generateNewYorkStockExchangeData(chartModel: StockMarketIndexChartModel): StockMarketIndexChartModel {
    if (this.stockMarketIndexChartDataModel.NEW_YORK_STOCK_EXCHANGE_DATA.length === 0) {
      chartModel.NEW_YORK_STOCK_EXCHANGE = 0.00;
    } else {
      chartModel.NEW_YORK_STOCK_EXCHANGE = this.stockMarketIndexChartDataModel.NEW_YORK_STOCK_EXCHANGE_DATA[this.stockMarketIndexChartDataModel.NEW_YORK_STOCK_EXCHANGE_DATA.length - 1];
    }
    return chartModel;
  }

  private clearIndexData() {
    if (this.stockMarketIndexData.length === 3) {
      this.stockMarketIndexData.splice(0, 1);
    }
    if (this.stockMarketIndexChartDataModel.AMERICAN_STOCK_EXCHANGE_DATA.length > 14) {
      this.stockMarketIndexChartDataModel.AMERICAN_STOCK_EXCHANGE_DATA.splice(0, 1);
    }
    if (this.stockMarketIndexChartDataModel.NASDAQ_DATA.length > 14) {
      this.stockMarketIndexChartDataModel.NASDAQ_DATA.splice(0, 1);
    }
    if (this.stockMarketIndexChartDataModel.NEW_YORK_STOCK_EXCHANGE_DATA.length > 14) {
      this.stockMarketIndexChartDataModel.NEW_YORK_STOCK_EXCHANGE_DATA.splice(0, 1);
    }
    if (this.stockMarketIndexChartDataModel.RUSSELL_INVESTMENT_GROUP_DATA.length > 14) {
      this.stockMarketIndexChartDataModel.RUSSELL_INVESTMENT_GROUP_DATA.splice(0, 1);
    }
  }
}
