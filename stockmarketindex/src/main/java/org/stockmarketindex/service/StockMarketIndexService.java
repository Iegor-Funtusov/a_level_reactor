package org.stockmarketindex.service;

import org.stockmarketindex.model.StockMarketIndexModel;
import reactor.core.publisher.Flux;

public interface StockMarketIndexService {

    Flux<StockMarketIndexModel> getStockMarketIndexModelFlux();
}
