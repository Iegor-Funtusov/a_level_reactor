package org.stockmarketindex.model;

import lombok.Data;

@Data
public class StockMarketIndexModel {

    private StockMarketIndexName stockMarketIndexName;
    private double stockMarketIndexCurrentValue;
    private double stockMarketIndexMaxValue;
    private boolean stockMarketIndexUpValue;
}
