package org.stockmarketindex.model;

import java.util.Arrays;

public enum StockMarketIndexName {

    NEW_YORK_STOCK_EXCHANGE,
    NASDAQ,
    AMERICAN_STOCK_EXCHANGE,
    RUSSELL_INVESTMENT_GROUP;

    public static StockMarketIndexName getStockMarketIndexName(int index) {
        return Arrays.asList(StockMarketIndexName.values()).get(index);
    }
}
