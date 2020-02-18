package org.stockmarketindex.storage;

import lombok.experimental.UtilityClass;

import org.stockmarketindex.model.StockMarketIndexName;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@UtilityClass
public class StockMarketIndexStorage {

    private final Map<StockMarketIndexName, Double> STOCK_MARKET_INDEX_STORAGE_MAX_VALUES = new HashMap<>();
    private final List<Double> NEW_YORK_STOCK_EXCHANGE_LIST = new ArrayList<>();
    private final List<Double> NASDAQ_LIST = new ArrayList<>();
    private final List<Double> AMERICAN_STOCK_EXCHANGE_LIST = new ArrayList<>();
    private final List<Double> RUSSELL_INVESTMENT_GROUP_LIST = new ArrayList<>();

    public double getStockMarketIndexMaxValueByName(StockMarketIndexName indexName, double stockMarketIndexCurrentValue) {
        Double stockMarketIndexMaxValue = STOCK_MARKET_INDEX_STORAGE_MAX_VALUES.get(indexName);
        if (stockMarketIndexMaxValue == null) {
            STOCK_MARKET_INDEX_STORAGE_MAX_VALUES.put(indexName, stockMarketIndexCurrentValue);
            return stockMarketIndexCurrentValue;
        } else {
            if (stockMarketIndexCurrentValue > stockMarketIndexMaxValue) {
                STOCK_MARKET_INDEX_STORAGE_MAX_VALUES.put(indexName, stockMarketIndexCurrentValue);
                return stockMarketIndexCurrentValue;
            } else {
                return stockMarketIndexMaxValue;
            }
        }
    }

    public boolean getStockMarketIndexUpValue(StockMarketIndexName indexName, double stockMarketIndexCurrentValue) {
        switch (indexName) {
            case AMERICAN_STOCK_EXCHANGE: return getCurrentUp(stockMarketIndexCurrentValue, AMERICAN_STOCK_EXCHANGE_LIST);
            case RUSSELL_INVESTMENT_GROUP: return getCurrentUp(stockMarketIndexCurrentValue, RUSSELL_INVESTMENT_GROUP_LIST);
            case NEW_YORK_STOCK_EXCHANGE: return getCurrentUp(stockMarketIndexCurrentValue, NEW_YORK_STOCK_EXCHANGE_LIST);
            case NASDAQ: return getCurrentUp(stockMarketIndexCurrentValue, NASDAQ_LIST);
        }
        return false;
    }

    private boolean getCurrentUp(double stockMarketIndexCurrentValue, List<Double> models) {
        if (models.isEmpty()) {
            models.add(stockMarketIndexCurrentValue);
            return true;
        } else {
            double index = models.get(models.size() - 1);
            if (models.size() > 5) {
                models = new ArrayList<>(models.subList(0, 5));
            }
            models.add(index);
            return stockMarketIndexCurrentValue > index;
        }
    }
}
