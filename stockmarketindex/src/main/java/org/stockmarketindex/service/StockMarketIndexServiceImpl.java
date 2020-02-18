package org.stockmarketindex.service;

import org.springframework.stereotype.Service;
import org.stockmarketindex.model.StockMarketIndexModel;
import org.stockmarketindex.model.StockMarketIndexName;
import org.stockmarketindex.storage.StockMarketIndexStorage;
import reactor.core.publisher.Flux;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class StockMarketIndexServiceImpl implements StockMarketIndexService {

    @Override
    public Flux<StockMarketIndexModel> getStockMarketIndexModelFlux() {
        return Flux.create(fl -> {
            Random random = new Random();
            for (int i = 0; i < 50; i++) {
                int randomIndex = random.ints(0, 4).findFirst().getAsInt();
                StockMarketIndexName stockMarketIndexName = StockMarketIndexName.getStockMarketIndexName(randomIndex);
                double stockMarketIndexValue = ThreadLocalRandom.current().nextDouble(100.00, 200.00);
                double stockMarketIndexMaxValue = StockMarketIndexStorage.getStockMarketIndexMaxValueByName(stockMarketIndexName, stockMarketIndexValue);
                boolean stockMarketIndexUpValue = StockMarketIndexStorage.getStockMarketIndexUpValue(stockMarketIndexName, stockMarketIndexValue);
                StockMarketIndexModel model = new StockMarketIndexModel();
                model.setStockMarketIndexName(stockMarketIndexName);
                model.setStockMarketIndexCurrentValue(stockMarketIndexValue);
                model.setStockMarketIndexMaxValue(stockMarketIndexMaxValue);
                model.setStockMarketIndexUpValue(stockMarketIndexUpValue);
                fl.next(model);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            fl.complete();
        });
    }
}
