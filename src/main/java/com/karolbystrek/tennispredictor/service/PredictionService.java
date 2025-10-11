package com.karolbystrek.tennispredictor.service;

import com.karolbystrek.tennispredictor.config.PredictionApiConfiguration;
import com.karolbystrek.tennispredictor.dto.PredictionRequest;
import com.karolbystrek.tennispredictor.dto.PredictionResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private static final Logger log = LoggerFactory.getLogger(PredictionService.class);

    private final WebClient predictionApiClient;
    private final PredictionApiConfiguration predictionApiConfiguration;

    public PredictionResponse makePredictionFor(PredictionRequest request) {
        log.info("Making prediction request for: {}", request);

        try {
            return predictionApiClient.post()
                    .uri(predictionApiConfiguration.getPredictPath())
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(PredictionResponse.class)
                    .doOnError(WebClientResponseException.class, ex ->
                            log.error("Prediction API error: Status {}, Body: {}",
                                    ex.getStatusCode(), ex.getResponseBodyAsString()))
                    .doOnError(Exception.class, ex ->
                            log.error("Error calling prediction API: {}", ex.getMessage(), ex))
                    .onErrorResume(WebClientResponseException.class, ex ->
                            Mono.error(new RuntimeException("Prediction API returned error: " + ex.getStatusCode())))
                    .onErrorResume(Exception.class, ex ->
                            Mono.error(new RuntimeException("Failed to connect to prediction API", ex)))
                    .block();
        } catch (Exception e) {
            log.error("Failed to get prediction: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to get prediction from API", e);
        }
    }
}
