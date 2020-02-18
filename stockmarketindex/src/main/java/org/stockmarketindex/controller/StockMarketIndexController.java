package org.stockmarketindex.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.stockmarketindex.model.StockMarketIndexModel;
import org.stockmarketindex.service.StockMarketIndexService;
import reactor.core.publisher.Flux;

@CrossOrigin("http://localhost:4200")
@RestController
@AllArgsConstructor
@RequestMapping("/indexes")
public class StockMarketIndexController {

    private final StockMarketIndexService stockMarketIndexService;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<StockMarketIndexModel> indexes() {
        return stockMarketIndexService.getStockMarketIndexModelFlux();
    }
}
