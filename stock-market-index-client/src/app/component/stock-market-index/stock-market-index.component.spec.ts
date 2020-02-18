import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketIndexComponent } from './stock-market-index.component';

describe('StockMarketIndexComponent', () => {
  let component: StockMarketIndexComponent;
  let fixture: ComponentFixture<StockMarketIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMarketIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMarketIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
