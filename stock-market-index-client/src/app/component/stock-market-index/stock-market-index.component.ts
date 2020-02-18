import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { ChartDataSets } from 'chart.js';

import { StockMarketIndexDataSource } from '../../service/stock-market-index-data-source';
import { StockMarketIndexStorageService } from '../../service/stock-market-index-storage.service';
import { StockMarketIndexViewModel } from '../../model/stock-market-index-view.model';

@Component({
  selector: 'app-stock-market-index',
  templateUrl: './stock-market-index.component.html',
  styleUrls: ['./stock-market-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockMarketIndexComponent implements OnInit, OnDestroy {

  dataSource: StockMarketIndexDataSource;
  displayedColumns: string[] = [
    'NEW_YORK_STOCK_EXCHANGE',
    'NASDAQ',
    'AMERICAN_STOCK_EXCHANGE',
    'RUSSELL_INVESTMENT_GROUP',
  ];

  NEW_YORK_STOCK_EXCHANGE_SUBJECT = new BehaviorSubject<boolean>(false);
  NASDAQ_SUBJECT = new BehaviorSubject<boolean>(false);
  AMERICAN_STOCK_EXCHANGE_SUBJECT = new BehaviorSubject<boolean>(false);
  RUSSELL_INVESTMENT_GROUP_SUBJECT = new BehaviorSubject<boolean>(false);

  NEW_YORK_STOCK_EXCHANGE_UP_LOADING = this.NEW_YORK_STOCK_EXCHANGE_SUBJECT.asObservable();
  NASDAQ_UP_LOADING = this.NASDAQ_SUBJECT.asObservable();
  AMERICAN_STOCK_EXCHANGE_UP_LOADING = this.AMERICAN_STOCK_EXCHANGE_SUBJECT.asObservable();
  RUSSELL_INVESTMENT_GROUP_UP_LOADING = this.RUSSELL_INVESTMENT_GROUP_SUBJECT.asObservable();

  NEW_YORK_STOCK_EXCHANGE_MAX: number;
  NASDAQ_MAX: number;
  AMERICAN_STOCK_EXCHANGE_MAX: number;
  RUSSELL_INVESTMENT_GROUP_MAX: number;

  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Array<string> = [];

  lineChartOptions: any;
  lineChartColors: Array<any>;
  lineChartLegend: boolean;

  lineChartLabelsSubscription = new Subscription();
  lineChartDataSubscription = new Subscription();

  constructor(private stockMarketIndexStorageService: StockMarketIndexStorageService) {
    this.dataSource = new StockMarketIndexDataSource(this.stockMarketIndexStorageService);
    this.dataSource.loadData();
    this.generateLineChart();
  }

  ngOnInit() {
    this.lineChartLegend = true;
    this.lineChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      showScale: false,
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1
          }
        }]
      }
    };

    this.lineChartColors = [
      {
        borderColor: 'rgba(255, 46, 38, 1)',
        pointBackgroundColor: 'rgba(255, 46, 38, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 46, 38, 0.8)',
        backgroundColor: 'rgba(255, 46, 38, 0.2)',
      },
      {
        borderColor: 'rgba(13, 146, 255, 1)',
        pointBackgroundColor: 'rgba(13, 146, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(13, 146, 255, 0.8)',
        backgroundColor: 'rgba(13, 146, 255, 0.2)',
      },
      {
        borderColor: 'rgba(251, 140, 0, 1)',
        pointBackgroundColor: 'rgba(251, 140, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(251, 140, 0, 0.8)',
        backgroundColor: 'rgba(251, 140, 0, 0.2)',
      },
      {
        borderColor: 'rgba(178, 180, 150, 1)',
        pointBackgroundColor: 'rgba(178, 180, 150, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(178, 180, 150, 0.8)',
        backgroundColor: 'rgba(178, 180, 150, 0.2)',
      }
    ];
  }

  initTableState(element: StockMarketIndexViewModel) {
    if (this.lineChartLabels.length > 14) {
      this.lineChartLabels.splice(0, 1);
    }
    switch (element.indexData.stockMarketIndexName) {
      case 'RUSSELL_INVESTMENT_GROUP' : {
        this.RUSSELL_INVESTMENT_GROUP_SUBJECT.next(element.indexData.stockMarketIndexUpValue);
        this.RUSSELL_INVESTMENT_GROUP_MAX = (element.indexData.stockMarketIndexMaxValue);
        break;
      }
      case 'AMERICAN_STOCK_EXCHANGE' : {
        this.AMERICAN_STOCK_EXCHANGE_SUBJECT.next(element.indexData.stockMarketIndexUpValue);
        this.AMERICAN_STOCK_EXCHANGE_MAX = (element.indexData.stockMarketIndexMaxValue);
        break;
      }
      case 'NASDAQ' : {
        this.NASDAQ_SUBJECT.next(element.indexData.stockMarketIndexUpValue);
        this.NASDAQ_MAX = (element.indexData.stockMarketIndexMaxValue);
        break;
      }
      case 'NEW_YORK_STOCK_EXCHANGE' : {
        this.NEW_YORK_STOCK_EXCHANGE_SUBJECT.next(element.indexData.stockMarketIndexUpValue);
        this.NEW_YORK_STOCK_EXCHANGE_MAX = (element.indexData.stockMarketIndexMaxValue);
        break;
      }
    }
  }

  private generateLineChart() {
    this.lineChartData = [
      { data: [], label: 'NEW YORK STOCK' },
      { data: [], label: 'NASDAQ' },
      { data: [], label: 'AMERICAN STOCK' },
      { data: [], label: 'RUSSELL INVESTMENT GROUP' },
    ];
    const source = timer(500, 2000);
    this.lineChartLabelsSubscription = source.subscribe(val => {
      const lineChartLabelDateUpdate = new Date();
      // tslint:disable-next-line:max-line-length
      this.lineChartLabels.push(
        lineChartLabelDateUpdate.getHours().toString() + ':' +
        lineChartLabelDateUpdate.getMinutes().toString() + ':' +
        lineChartLabelDateUpdate.getSeconds().toString());
      this.lineChartDataSubscription = this.dataSource.loadStockMarketIndexChartData().subscribe(value => {
        this.lineChartData[0].data = value.NEW_YORK_STOCK_EXCHANGE_DATA;
        this.lineChartData[1].data = value.NASDAQ_DATA;
        this.lineChartData[2].data = value.AMERICAN_STOCK_EXCHANGE_DATA;
        this.lineChartData[3].data = value.RUSSELL_INVESTMENT_GROUP_DATA;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.lineChartDataSubscription) {
      this.lineChartDataSubscription.unsubscribe();
    }
    if (this.lineChartLabelsSubscription) {
      this.lineChartLabelsSubscription.unsubscribe();
    }
  }
}
